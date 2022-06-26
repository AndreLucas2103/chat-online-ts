import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { Chat } from "../../schema/Chat";
import { Usuario } from "../../schema/Usuario";
import { CallbackError } from "../error/CallbackError";

export async function usuarioEntrarChat(
    io: Server,
    socket: Socket,
    data: {
        idChat: string,
        idUsuario: string,
    },
    callback: Function
): Promise<void> {
    try {

        const chat = await Chat.findOne({
            idChat: data.idChat,
        })

        if (!chat) return callback({ erro: new CallbackError('Chat não localizado') })

        if (chat.idUsuarios.findIndex(usuario => usuario._id.toString() === data.idUsuario) === -1) { // verifica se o usuário já entrou no chat para não adicionar duas vezes
            chat.idUsuarios.push(new mongoose.Types.ObjectId(data.idUsuario)) // convert string to ObjectId Mongodb

            await chat.save()
        }

        socket.join(chat.socketId)

        io.to(chat.socketId).emit('usuario_entrou_chat', {
            data: {
                chat,
                usuario: await Usuario.findById(data.idUsuario)
            }
        })

        callback({
            data: {
                chat
            }
        })

    } catch (err) {
        return callback({ erro: new CallbackError() });
    }
}