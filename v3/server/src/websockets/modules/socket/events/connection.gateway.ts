import { jwtVerify } from '@/common/jwt';
import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsuarioService } from '../../usuario/usuario.service';

@WebSocketGateway()
export class ConnectionGateway {
    constructor(private usuario: UsuarioService) {}

    async handleConnection(client: Socket) {
        const { token } = client.handshake.auth;

        if (token) {
            const decodedToken: any = jwtVerify(token)

            if (decodedToken.id) {
                const usuario = await this.usuario.update(decodedToken.id, {
                    socketId: client.id,
                    statusChat: 2
                })

                client.emit('usuario_conectado', {
                    data: { usuario }
                })
            }
        }

        /* console.log(`client connecter ${client.id}`) */
    }
}
