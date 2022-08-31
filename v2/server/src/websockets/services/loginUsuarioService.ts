import { Socket } from 'socket.io';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../../schemas/Usuario';
import { CallbackData } from '../error/CallbackData';
import { CallbackError } from '../error/CallbackError';

import { authJWT } from '../../config/auth';

interface ILoginUsuarioServoceData {
    email: string;
    senha: string;
}

function generateToken(params = {}) {
    return jwt.sign(params, authJWT.secret, {});
}

export async function loginUsuarioService(
    socket: Socket,
    data: ILoginUsuarioServoceData,
    callback: Function,
): Promise<void> {
    const { email, senha } = data;

    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario) return void callback(new CallbackError('Usuário não encontrado', '404'));

    if (!await bcrypt.compare(senha, usuario.senha)) return void callback(new CallbackError('Senha inválida', '401'));

    const token = generateToken({ id: usuario._id });

    usuario.socketId = socket.id;
    usuario.statusChat = 2;

    const usuarioSave = await usuario.save();

    usuarioSave.senha = '';

    callback(new CallbackData({
        token,
        usuario: usuarioSave,
    }));
}
