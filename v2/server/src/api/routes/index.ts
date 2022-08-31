import { Router } from 'express';
import { chatRoutes } from './chat.routes';
import { mensagemRoutes } from './mensagem.routes';
import { usuarioRoutes } from './usuario.routes';

const routes = Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/chat', chatRoutes);
routes.use('/mensagem', mensagemRoutes);

export { routes };
