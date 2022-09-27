import { jwtGenerateToken } from '@/common/jwt';
import { CallbackData, CallbackError } from '@/websockets/callback/CallbackType';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AuthLoginDto } from '../dtos/auth-login.dto';
import { UsuarioService } from '../usuario.service';

import * as bcrypt from 'bcryptjs'
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AuthLoginGateway {
    constructor(private usuario: UsuarioService) {}

    @SubscribeMessage('auth_login')
    async handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: AuthLoginDto
    ) {
        const { email, senha } = data;

        let usuario = await this.usuario.findByEmail(email)

        if (!usuario) return new CallbackError("Usuário não encontrado")

        if (!await bcrypt.compare(senha, usuario.senha)) {
            return new CallbackError("Credenciais inválidas")
        };

        usuario = await this.usuario.update(usuario.id, {
            statusChat: 2,
            socketId: socket.id
        })

        const token = jwtGenerateToken({ id: usuario.id })

        usuario.senha = ""

        return new CallbackData({
            token,
            usuario,
        })
    }
}
