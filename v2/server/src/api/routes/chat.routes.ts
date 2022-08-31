import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { BuscarChatController } from '../useCases/chat/buscarChat/buscarChatController';

const chatRoutes = Router();

const buscarChatController = new BuscarChatController();

chatRoutes.get('/:uuid', authMiddleware, buscarChatController.handle);

export { chatRoutes };
