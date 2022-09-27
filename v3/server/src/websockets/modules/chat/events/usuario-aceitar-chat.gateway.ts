import { CallbackData, CallbackError } from '@/websockets/callback/CallbackType';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ClienteService } from '../../cliente/cliente.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { ChatService } from '../chat.service';
import { UsuarioAceitarChatDto } from '../dtos/usuario-aceitar-chat.dto';

@WebSocketGateway()
export class UsuarioAceitarChatGateway {
    constructor(
        private chat: ChatService,
        private usuario: UsuarioService,
        private cliente: ClienteService
    ) {}

    @SubscribeMessage('usuario_aceitar_chat')
    async handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: UsuarioAceitarChatDto
    ) {
        const { idChat, idUsuario } = data;

        let [chat, usuario] = await Promise.all([
            this.chat.findById(idChat),
            this.usuario.findById(idUsuario)
        ])

        if (!chat) return new CallbackError("Ocorreu um erro")
        if (!usuario) return new CallbackError("Ocorreu um erro")

        socket.join(chat.uuid);

        chat = await this.chat.update(chat.id, {
            idUsuarioResponsavel: usuario.id,
            situacao: 2,
            idUsuarioFila: null
        })

        const cliente = await this.cliente.findById(chat.idCliente)

        socket.to(chat.uuid).emit('usuario_aceitar_chat', {
            data: {
                chat: {
                    id: chat.id,
                    situacao: chat.situacao,
                    uuid: chat.uuid,
                    usuarioAtendimento: {
                        id: usuario.id,
                        nome: usuario.primeiroNome,
                        foto: usuario.foto,
                    },
                },
            },
        });

        return new CallbackData({
            chat: {
                ...chat,
                cliente: cliente
            }
        })

    }
}
