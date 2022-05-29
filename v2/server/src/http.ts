import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const app = express();

const server = createServer(app);

mongoose.connect("mongodb+srv://admin:admin@delivery-zap-teste1.hrbcb.mongodb.net/chatOnlineTsV2?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB");
})

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    return res.send('Hello World');
});

export { server, io }