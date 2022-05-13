import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3030"
export const socket = socketIOClient(ENDPOINT);