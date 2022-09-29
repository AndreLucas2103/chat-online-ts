import { CallbackData, CallbackError } from '@/websockets/callback/CallbackType';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ClienteService } from '../../cliente/cliente.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { ChatService } from '../chat.service';
import { ChatlogService } from '../chatlog.service';
import { UsuarioRecusarChatDto } from '../dtos/usuario-recusar-chat.dto';

@WebSocketGateway()
export class UsuarioRecusarChatGateway {
    constructor(
        private chat: ChatService,
        private usuario: UsuarioService,
        private cliente: ClienteService,
        private chatLog: ChatlogService,
    ) {}

    @SubscribeMessage('usuario_recusar_chat')
    async handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() data: UsuarioRecusarChatDto
    ) {
        const { idChat, idUsuario, acao } = data;

        const chat = await this.chat.findById(Number(idChat))


    }
}
