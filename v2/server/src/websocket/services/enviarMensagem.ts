import { Server, Socket } from "socket.io";
import { Mensagem } from "../../schema/Mensagem";
import { Usuario } from "../../schema/Usuario";
import { CallbackError } from "../error/CallbackError";

export async function enviarMensagem(
    io: Server,
    socket: Socket,
    data: {
        _idChat: string,
        idUsuario?: string,
        conteudo: string,
        enviadaPorCliente?: boolean,
        socketId: string,
    },
    callback: Function
): Promise<void> {
    const { idUsuario, conteudo, socketId, enviadaPorCliente, _idChat } = data;

    const mensagem = await Mensagem.create({
        idChat: _idChat,
        idUsuario,
        conteudo,
        enviadaPorCliente,
        createdAt: new Date(),
    })

    io.to(data.socketId).emit("nova_mensagem", {
        data: {
            mensagem,
        }
    });
}