import { Server, Socket } from 'socket.io';
import { Chat } from '@/schemas/Chat';
import { Mensagem } from '@/schemas/Mensagem';

interface INovaMensagemServiceData {
    idChat: string;
    mensagem: string;
    idCliente?: string;
    idUsuario?: string;
}

export async function novaMensagemService(
    io: Server,
    socket: Socket,
    data: INovaMensagemServiceData,
): Promise<void> {
    const chat = await Chat.findById(data.idChat);

    if (!chat) return;

    const mensagemCreate = await Mensagem.create({
        mensagem: data.mensagem,
        idCliente: data.idCliente || null,
        idUsuario: data.idUsuario || null,
        idChat: chat._id,
    });

    const mensagem = await Mensagem.aggregate([
        {
            $match: { _id: mensagemCreate._id },
        },
        {
            $lookup: {
                from: 'clientes',
                localField: 'idCliente',
                foreignField: '_id',
                as: 'cliente',
            },
        },
        { $unwind: '$cliente' },
    ]);

    io.in(chat.uuid).emit('nova_mensagem', {
        data: {
            mensagem: mensagem[0],
        },
    });
}
