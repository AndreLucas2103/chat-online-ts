import express from 'express';
import 'express-async-errors';

import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { handleErrorMiddleware } from './api/middlewares/handleErrorMiddleware';
import { routes } from './api/routes';

const app = express();

app.use(express.json());

const server = createServer(app);

mongoose.connect('mongodb+srv://admin:admin@delivery-zap-teste1.hrbcb.mongodb.net/chatOnlineTs-v2?retryWrites=true&w=majority').then(() => {
    console.log('Connected to MongoDB');
});

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(routes);

app.get('/', (req, res) => res.send('Hello World'));

app.use(handleErrorMiddleware); // middleware para tratar erros v2 *Utiliza controle async*

export { server, io };
