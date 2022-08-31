import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { authJWT } from '@/config/auth';
import { Usuario } from '@/schemas/Usuario';

// eslint-disable-next-line consistent-return
export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token não existe' }); // verifica se token existe

    const parts = authHeader.split(' '); // reparte o bearer do token

    if (parts.length !== 2) return res.status(401).json({ error: 'Token error' }); // se for menor que duas partes, já da erro

    const [scheme, token] = parts; // separa as partes

    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatado' }); // verifica se existe o esquema do bearer

    jwt.verify(token, authJWT.secret, async (err: any, decoded: any) => { // pamentros do token
        if (err) { return res.status(401).json({ error: 'Token invalido' }); }

        if (Date.now() > decoded.exp * 1000) return res.status(401).send('Token expirou'); // verifica se o token não está expirado

        const idUsuario = decoded.id;

        const usuario = await Usuario.findOne({ // consulta do usuario autenticado
            _id: idUsuario,
        }).select('+senha');

        if (!usuario) return res.status(401).send('Erro no token ou usuario inválido');

        req.user = {
            id: usuario._id.toString(),
            administrador: usuario.administrador,
        };

        return next();
    });
}
