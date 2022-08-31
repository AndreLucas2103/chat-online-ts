import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { BuscarTodosUsuarioController } from '../useCases/usuario/buscarTodosUsuario/buscarTodosUsuarioController';
import { CriarUsuarioController } from '../useCases/usuario/criarUsuario/criarUsuarioController';

const usuarioRoutes = Router();

const criarUsuarioController = new CriarUsuarioController();
const buscarTodosUsuarioController = new BuscarTodosUsuarioController();

usuarioRoutes.get('/', authMiddleware, buscarTodosUsuarioController.handle);
usuarioRoutes.post('/', authMiddleware, criarUsuarioController.handle);

export { usuarioRoutes };
