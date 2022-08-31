import { Mensagem } from '@/schemas/Mensagem';

interface IBuscarMensagensUseCaseRequest {
    limite: number,
    pagina: number,
    idChat: string,
}

export class BuscarMensagensUseCase {
    async execute({ limite, pagina, idChat }: IBuscarMensagensUseCaseRequest) {
        const mensagens = await Mensagem.aggregate([
            {
                $match: {
                    idChat,
                },
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'idUsuario',
                    foreignField: '_id',
                    as: 'usuario',
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
                    path: '$cliente',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: '$usuario',
                    preserveNullAndEmptyArrays: true,
                },
            },
            { $limit: limite },
            { $skip: (pagina - 1) * limite },
        ]);

        const count = await Mensagem.countDocuments({
            idChat,
        });

        return {
            pagina,
            limite,
            count,
            data: mensagens,
        };
    }
}
