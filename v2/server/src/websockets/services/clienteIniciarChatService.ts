import { Server, Socket } from 'socket.io';
import { Cliente } from '@/schemas/Clientes';
import { Chat } from '@/schemas/Chat';
import { CallbackData } from '../error/CallbackData';

interface IClienteIniciarChatServiceData {
    email: number;
    nome: string;
}

export async function clienteIniciarChatService(
    io: Server,
    socket: Socket,
    data: IClienteIniciarChatServiceData,
    callback: Function,
): Promise<void> {
    let cliente = await Cliente.findOne({ email: data.email });

    if (!cliente) {
        cliente = await Cliente.create({
            email: data.email,
            nome: data.nome,
        });
    }

    const chat = await Chat.create({
        idCliente: cliente._id,
        situacao: 1,
    });

    socket.join(chat.uuid);

    io.emit('novo_chat', {
        data: {
            chat,
            cliente,
        },
    });

    callback(new CallbackData({
        chat,
        cliente,
    }));
}
