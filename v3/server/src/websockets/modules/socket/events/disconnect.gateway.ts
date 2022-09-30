import { ConnectedSocket, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Prisma, Cliente } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../../chat/chat.service';
import { ClienteService } from '../../cliente/cliente.service';
import { UsuarioService } from '../../usuario/usuario.service';

@WebSocketGateway()
export class DisconnectGateway {
    @WebSocketServer()
    io: Server;

    tentativas: string[]

    constructor(
        private usuario: UsuarioService,
        private cliente: ClienteService,
        private chat: ChatService,
    ) {}

    async handleDisconnect(
        @ConnectedSocket() socket: Socket,
    ) {
        const usuario = await this.usuario.findBySocketId(socket.id);

        let cliente: Cliente

        // tentar reconectar, start

        function reconectar() {
            setInterval(() => {
                socket.emit('opa', true, () => {
                    console.log('as')
                })
            }, 2000)
        }

        reconectar()

        // tentar reconhecer, end

        if (usuario) {

            await this.usuario.update(usuario.id, {
                statusChat: 3,
            })

            await this.chat.updateMany(
                {
                    idUsuarioResponsavel: usuario.id,
                    situacao: 2
                },
                {
                    situacao: 3
                }
            )

            const chatsFIla = await this.chat.findMany({
                idUsuarioFila: usuario.id
            })

            if (chatsFIla.length > 0) { // caso tenha clientes na fila, o sistema redistribui para outros atendentes
                for await (const chat of chatsFIla) { // for assincrono, para que não tenha problemas com mais de um usuário
                    const usuarioProximo = await this.usuario.findUsuarioProximoChat()

                    if (usuarioProximo) {
                        await this.chat.update(chat.id, { idUsuarioFila: usuarioProximo.id })

                        this.io.to(usuarioProximo.socketId).emit("novo_chat", {
                            data: {
                                chat,
                                cliente: await this.cliente.findById(chat.idCliente)
                            }
                        })
                    } else {
                        await this.chat.update(chat.id, { idUsuarioFila: null })
                    }

                }
            }

        } else {
            cliente = await this.cliente.findBySocketId(socket.id)

            if (cliente) {
                await this.chat.updateMany(
                    {
                        cliente: {
                            socketId: cliente.socketId
                        },
                        situacao: { in: [1, 2] }
                    },
                    {
                        situacao: 3
                    }
                )

                await this.cliente.update(cliente.id, {
                    socketId: null,
                })
            }
        }

        /* console.log("Disconnect client " + socket.id) */

        this.io.emit("disconnect_socket", {
            data: {
                usuario,
                cliente
            }
        })
    }
}