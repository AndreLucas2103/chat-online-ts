import { Request, Response } from 'express';
import { CriarUsuarioUseCase } from './criarUsuarioUseCase';

export class CriarUsuarioController {
    async handle(req: Request, res: Response): Promise<Response> {
        const criarUsuarioUseCase = new CriarUsuarioUseCase();

        await criarUsuarioUseCase.execute(req.body);

        return res.status(200).send();
    }
}
