import { Router } from "express";
import { usuarioRoutes } from "./usuario.routes";

const router = Router();

router.use("/usuario", usuarioRoutes);

export { router };
