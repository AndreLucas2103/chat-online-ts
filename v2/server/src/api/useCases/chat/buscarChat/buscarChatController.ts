import { Request, Response } from 'express';
import { BuscarChatUseCase } from './buscarChatUseCase';

export class BuscarChatController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.params;

        const buscarChatUseCase = new BuscarChatUseCase();

        return res.status(200).json({
            data: await buscarChatUseCase.execute(uuid),
        });
    }
}
