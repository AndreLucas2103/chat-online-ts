import { Request, Response } from 'express';
import { AppError } from '@/api/errors/AppError';
import { BuscarMensagensUseCase } from './buscarMensagensUseCase';

export class BuscarMensagensController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            pagina = 1,
            limite = 10,
            idChat,
        } = req.query;

        if (!idChat) throw new AppError('');

        const buscarMensagensUseCase = new BuscarMensagensUseCase();

        return res.status(200).json(await buscarMensagensUseCase.execute({
            idChat: idChat.toString(),
            limite: Number(limite),
            pagina: Number(pagina),
        }));
    }
}
