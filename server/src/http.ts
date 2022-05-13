import 'reflect-metadata';
import express from 'express';
/* import path from 'path'; */
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const app = express();

const server = createServer(app);

mongoose.connect("mongodb+srv://admin:admin@delivery-zap-teste1.hrbcb.mongodb.net/chatOnlineTs?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB");
})

/* app.use(express.static(path.join(__dirname, '..', 'public'))); */

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on("connection", async (socket) => {
    
})

app.get('/', (req, res) => {
    return res.send('Hello World');
});

export { server, io }