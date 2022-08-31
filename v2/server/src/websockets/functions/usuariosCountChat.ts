import { Types } from 'mongoose';
import { Usuario } from '@/schemas/Usuario';

interface IUsuariosListCountChat {
    _id: Types.ObjectId;
    countChats: number;
    primeiroNome: string;
    email: string;
    statusChat: number;
    administrador: boolean;
    socketId: string;
    countChatsAndamento: number;
    countChatsFila: number;
    qtdChatsPassaramFila: number;
}

export async function usuariosCountChat() {
    const usuarios: IUsuariosListCountChat[] = await Usuario.aggregate([
        {
            $lookup: {
                from: 'chats',
                localField: '_id',
                pipeline: [
                    { $match: { situacao: 2 } },
                ],
                foreignField: 'idUsuarioAtendimento',
                as: 'chatsAndamento',
            },
        },
        {
            $lookup: {
                from: 'chats',
                localField: '_id',
                pipeline: [
                    { $match: { situacao: 2 } },
                ],
                foreignField: 'idUsuarioFila',
                as: 'chatsChatFila',
            },
        },
        { $addFields: { countChatsAndamento: { $size: '$chatsAndamento' } } },
        { $addFields: { countChatsFila: { $size: '$chatsChatFila' } } },
        { $unset: ['chats', 'chatsChatFila', 'senha'] },
    ]);

    return usuarios;
}
