import { Chat } from '@/schemas/Chat';

export class BuscarChatUseCase {
    async execute(uuidChat: string) {
        const chat = await Chat.aggregate([
            {
                $match: { uuid: uuidChat },
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'idUsuarioFila',
                    foreignField: '_id',
                    as: 'usuarioFila',
                },
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'idUsuarioAndamento',
                    foreignField: '_id',
                    as: 'usuarioAndamento',
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'idCliente',
                    foreignField: '_id',
                    as: 'cliente',
                },
            },
            {
                $unwind: {
                    path: '$usuarioAndamento',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: '$usuarioFila',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: '$cliente',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);

        return chat[0] || null;
    }
}
