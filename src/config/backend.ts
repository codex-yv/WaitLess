export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

// WebSocket URL — derived from BACKEND_URL (http → ws, https → wss)
export const WS_URL = BACKEND_URL.replace(/^http/, 'ws');