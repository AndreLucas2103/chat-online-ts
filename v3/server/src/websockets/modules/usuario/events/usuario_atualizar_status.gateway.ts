import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CallbackData } from '../../../callback/CallbackType';
import { ChatService } from '../../chat/chat.service';
import { ClienteService } from '../../cliente/cliente.service';
import { UsuarioService } from '../usuario.service';

@WebSocketGateway()
export class UsuarioAtualizarStatusGateway {
    constructor(
        private usuario: UsuarioService,
        private chat: ChatService,
        private cliente: ClienteService,
    ) {}

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('usuario_atualizar_status')
    async handleMessage(
        @MessageBody() data: { idUsuario: number; statusChat: number },
        @ConnectedSocket() client: Socket
    ) {
        const { idUsuario, statusChat } = data;

        console.log(client.handshake.auth)

        const chats = await this.chat.findMany(
            {
                situacao: 1,
                idUsuarioFila: null,
            }
        )

        if (chats.length > 0) {

            const promises = chats.map(async c => {

                const [chat, usuario] = await Promise.all([
                    this.chat.update(c.id, { idUsuarioFila: idUsuario }),
                    this.usuario.findById(idUsuario)
                ])

                const cliente = await this.cliente.findById(chat.idCliente)

                this.io.to(usuario.socketId).emit("novo_chat", {
                    data: {
                        chat,
                        cliente
                    }
                })
            })

            try {
                await Promise.all(promises)
            } catch (err) {
                console.log(err)
            }
        }

        await this.usuario.update(idUsuario, {
            statusChat
        })

        return new CallbackData({})
    }
}
