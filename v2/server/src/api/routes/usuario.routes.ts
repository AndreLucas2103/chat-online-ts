import { Router } from "express";
import { CriarUsuarioController } from "../modules/usuario/useCases/criarUsuario/criarUsuarioController";

const usuarioRoutes = Router();

const criarUsuarioController = new CriarUsuarioController();

usuarioRoutes.post('/', criarUsuarioController.handle);

export { usuarioRoutes }