import { CallbackData } from '@/websockets/callback/CallbackType';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from '../../chat/chat.service';
import { NovaMensagemDto } from '../dtos/nova-mensagem.dto';
import { MensagemService } from '../mensagem.service';

@WebSocketGateway()
export class NovaMensagemGateway {
    constructor(
        private chat: ChatService,
        private mensagem: MensagemService,
    ) {}

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('nova_mensagem')
    async handleMessage(
        @MessageBody() data: NovaMensagemDto,
    ) {
        const { idChat, mensagem, idCliente, idUsuario } = data;

        const chat = await this.chat.findById(idChat)

        const mensagemCriada = await this.mensagem.create({
            idChat,
            mensagem,
            idUsuario,
            idCliente,
        })

        this.io.to(chat.uuid).emit("nova_mensagem", {
            data: {
                mensagem: mensagemCriada,
                chat: chat
            }
        })

        return new CallbackData({})
    }
}
