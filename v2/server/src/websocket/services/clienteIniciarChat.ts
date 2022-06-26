import { Server, Socket } from "socket.io";
import { Chat } from "../../schema/Chat";
import { Usuario } from "../../schema/Usuario";
import { CallbackError } from "../error/CallbackError";

export async function clienteInicarChat(
    io: Server,
    socket: Socket,
    data: {
        nome: string
    },
    callback: Function
): Promise<void> {
    try {

        const chat = await Chat.create({
            socketId: socket.id,
            nome: data.nome
        })

        io.emit('novo_chat', { chat })

        callback({
            data: { chat },
        })

    } catch (err) {
        return callback({ erro: new CallbackError() });
    }
}