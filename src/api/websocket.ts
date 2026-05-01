import { WS_URL } from '../config/backend.ts';

/**
 * WebSocket Manager for real-time communication with the backend.
 * Manages a single WebSocket connection per session (admin or client).
 */
class WebSocketManager {
    socket: WebSocket | null = null;
    connectedId: string | null = null;
    listeners: Record<string, Function[]> = {};
    shouldReconnect: boolean = true;
    reconnectDelay: number = 3000; // ms
    reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    constructor() {
    }

    /**
     * Connect to the WebSocket server with a given ID (admin_id or client_id).
     * If already connected with a different ID, disconnects the old one first.
     * @param {string} reqId - The unique ID to register on the WebSocket (e.g. admin_id)
     */
    connect(reqId) {
        if (!reqId) {
            console.warn('[WS] Cannot connect: no reqId provided.');
            return;
        }

        // If already connected with the same ID, skip
        if (this.socket && this.socket.readyState === WebSocket.OPEN && this.connectedId === reqId) {
            console.log(`[WS] Already connected as ${reqId}`);
            return;
        }

        // Disconnect any existing connection first
        this.disconnect();

        this.connectedId = reqId;
        this.shouldReconnect = true;

        const url = `${WS_URL}/ws/${reqId}`;
        console.log(`[WS] Connecting to ${url} ...`);

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log(`[WS] Connected as ${reqId}`);
            this._clearReconnectTimer();
            this._emit('open', { reqId });
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('[WS] Message received:', data);
                this._emit('message', data);

                // Also emit a specific event based on "loc" field from backend
                if (data.loc) {
                    this._emit(data.loc, data);
                }
            } catch (err) {
                console.error('[WS] Failed to parse message:', event.data, err);
            }
        };

        this.socket.onclose = (event) => {
            console.log(`[WS] Connection closed (code: ${event.code}, reason: ${event.reason})`);
            this._emit('close', { code: event.code, reason: event.reason });
            this._attemptReconnect();
        };

        this.socket.onerror = (error) => {
            console.error('[WS] Connection error:', error);
            this._emit('error', error);
        };
    }

    /**
     * Disconnect the current WebSocket connection.
     * Prevents automatic reconnection.
     */
    disconnect() {
        this.shouldReconnect = false;
        this._clearReconnectTimer();

        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.connectedId = null;
        console.log('[WS] Disconnected.');
    }

    /**
     * Send JSON data through the WebSocket.
     * @param {Object} data - The data to send.
     */
    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('[WS] Cannot send, socket is not open.');
        }
    }

    /**
     * Register an event listener.
     * Supported events: 'open', 'close', 'error', 'message',
     * and any backend "loc" values (e.g. 'generate_form', 'livequeue_cum_dashboard', 'client_dash').
     * @param {string} event - Event name.
     * @param {Function} callback - Callback function.
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * Remove a specific event listener.
     * @param {string} event - Event name.
     * @param {Function} callback - The exact callback reference to remove.
     */
    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    /**
     * Check if the WebSocket is currently connected.
     * @returns {boolean}
     */
    isConnected() {
        return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
    }

    /**
     * Get the currently connected ID.
     * @returns {string | null}
     */
    getConnectedId() {
        return this.connectedId;
    }

    // ─── Private helpers ──────────────────────────────────────

    /**
     * Emit an event to all registered listeners.
     * @param {string} event
     * @param {*} data
     * @private
     */
    _emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => {
                try {
                    cb(data);
                } catch (err) {
                    console.error(`[WS] Error in listener for "${event}":`, err);
                }
            });
        }
    }

    /**
     * Attempt to reconnect after an unexpected disconnect.
     * @private
     */
    _attemptReconnect() {
        if (!this.shouldReconnect || !this.connectedId) return;

        console.log(`[WS] Reconnecting in ${this.reconnectDelay / 1000}s ...`);
        this._clearReconnectTimer();

        const savedId = this.connectedId;
        this.reconnectTimer = setTimeout(() => {
            if (this.shouldReconnect && savedId) {
                this.connect(savedId);
            }
        }, this.reconnectDelay);
    }

    /**
     * Clear any pending reconnect timer.
     * @private
     */
    _clearReconnectTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }
}

// Export a singleton instance so every module shares the same connection
const wsManager = new WebSocketManager();
export default wsManager;
