import socketIOClient from "socket.io-client";

export const socket = socketIOClient(import.meta.env.VITE_APP_URL_SOCKETIO, {
    auth: {
        token: ""
    },
    transports: ['websocket', 'polling']
});