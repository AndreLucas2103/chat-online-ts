import mongoose from 'mongoose';
import { Socket } from 'socket.io';
import { Chat } from '@/schemas/Chat';
import { CallbackData } from '../error/CallbackData';
import { Usuario } from '@/schemas/Usuario';

interface IUsuarioAceitarChatServiceData {
    idChat: string;
    idUsuario: string;
}

export async function usuarioAceitarChat(
    socket: Socket,
    data: IUsuarioAceitarChatServiceData,
    callback: Function,
): Promise<void> {
    const chat = await Chat.findById(data.idChat);

    if (!chat) return;

    socket.join(chat.uuid);

    chat.idUsuarioAtendimento = new mongoose.Types.ObjectId(data.idUsuario);
    chat.situacao = 2;
    chat.idUsuarioFila = null;

    const chatSave = await chat.save();

    const usuario = await Usuario.findById(data.idUsuario);

    if (!usuario) return;

    socket.to(chatSave.uuid).emit('usuario_aceitar_chat', {
        data: {
            chat: {
                _id: chatSave._id,
                situacao: chatSave.situacao,
                uuid: chatSave.uuid,
                usuarioAtendimento: {
                    _id: usuario._id,
                    nome: usuario.primeiroNome,
                    foto: usuario.foto,
                },
            },
        },
    });

    callback(new CallbackData({
        chat: chatSave,
    }));
}
