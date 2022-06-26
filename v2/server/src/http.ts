import express, {
    NextFunction, Request, Response,
} from 'express';
require('express-async-errors');

import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { router } from './api/routes';
import { AppError } from './api/errors/AppError';
import { handleErrorMiddleware } from './api/middlewares/handleErrorMiddleware';

const app = express();
app.use(express.json());

const server = createServer(app);

mongoose.connect("mongodb+srv://admin:admin@delivery-zap-teste1.hrbcb.mongodb.net/chatOnlineTsV2?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB");
})

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(router)

app.use(handleErrorMiddleware);

export { server, io }