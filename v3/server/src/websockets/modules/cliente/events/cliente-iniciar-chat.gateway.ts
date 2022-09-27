import { CallbackData } from '@/websockets/callback/CallbackType';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Usuario } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../../chat/chat.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { ClienteService } from '../cliente.service';
import { ClienteIniciarChatDto } from '../dtos/cliente-iniciar-chat.dto';

@WebSocketGateway()
export class ClienteIniciarChatGateway {
    @WebSocketServer()
    io: Server;

    constructor(
        private cliente: ClienteService,
        private chat: ChatService,
        private usuario: UsuarioService,
    ) {}

    @SubscribeMessage('cliente_iniciar_chat')
    async handleMessage(
        @MessageBody() data: ClienteIniciarChatDto,
        @ConnectedSocket() socket: Socket,
    ) {

        const { email, nome } = data;

        let cliente = await this.cliente.findOne(email, nome);

        if (!cliente) { // verificacao se cliente existe, se não existir ele cria
            cliente = await this.cliente.create({
                email,
                nome,
                socketId: socket.id
            });
        } else {
            cliente = await this.cliente.update(cliente.id, {
                socketId: socket.id
            })
        }

        const chat = await this.chat.create({ // criar chat
            idCliente: cliente.id,
            situacao: 1
        })

        socket.join(chat.uuid); // inserir o cliente dentro do chat que foi criado, no caso ele cria o chat com base no uuid

        const usuario = await this.usuario.findUsuarioProximoChat()

        if (usuario) {
            await this.chat.update(chat.id, { idUsuarioFila: usuario.id })

            this.io.to(usuario.socketId).emit("novo_chat", {
                data: {
                    chat,
                    cliente
                }
            })
        }

        return new CallbackData({
            cliente,
            chat
        })
    }
}

interface IUsuarioFIlaChat extends Usuario {
    count_usuarioResponsavel: number;
    count_usuarioFila: number;
}

function usuarioFilaChat(
    usuarios: IUsuarioFIlaChat[]
) {
    const usuariosOnline = usuarios.filter(u => u.statusChat === 1)

    if (usuariosOnline.length < 1) return null

    const menorNumero = Math.min(...usuariosOnline.map(u => u.count_usuarioResponsavel))

    const usuariosMenorNumero = usuariosOnline.filter(u => u.count_usuarioResponsavel === menorNumero)

    const usuario = usuariosMenorNumero[Math.floor(Math.random() * usuariosMenorNumero.length)]

    return usuario
}