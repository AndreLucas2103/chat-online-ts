import { Request, Response } from 'express';
import { BuscarTodosUsuarioUseCase } from './buscarTodosUsuariosUseCase';

export class BuscarTodosUsuarioController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            pesquisa,
            pagina = 1,
            limite = 10,
            situacao,
            statusChat,
            administrador,
        } = req.query;

        const buscarTodosUsuarioUseCase = new BuscarTodosUsuarioUseCase();

        const useCase = await buscarTodosUsuarioUseCase.execute({
            pesquisa: pesquisa?.toString(),
            pagina: Number(pagina),
            limite: Number(limite),
            situacao: Number(situacao),
            statusChat: Number(statusChat),
            administrador: Boolean(administrador),
        });

        return res.status(200).json(useCase);
    }
}
