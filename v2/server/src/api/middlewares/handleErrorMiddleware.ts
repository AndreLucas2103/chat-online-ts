import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export function handleErrorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            erro: {
                statusCode: err.statusCode,
                mensagem: err.mensagem,
                codigoPermissao: err.codigoPermissao,
                detalhe: err.detalhe,
            },
        });
    }

    return res.status(500).json({
        erro: {
            mensagem: err.message || 'Erro interno no servidor',
            detalhe: '',
            statusCode: 500,
        },
    });
}
