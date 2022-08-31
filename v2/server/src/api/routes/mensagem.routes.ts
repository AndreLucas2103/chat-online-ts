import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { BuscarMensagensController } from '../useCases/mensagem/buscarTodasMensagem/buscarMensagensController';

const mensagemRoutes = Router();

const buscarMensagensController = new BuscarMensagensController();

mensagemRoutes.get('/', authMiddleware, buscarMensagensController.handle);

export { mensagemRoutes };
