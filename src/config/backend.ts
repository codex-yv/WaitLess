export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

// WebSocket URL — derived from BACKEND_URL (http → ws, https → wss)
export const WS_URL = BACKEND_URL.replace(/^http/, 'ws');