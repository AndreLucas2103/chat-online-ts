import { AppError } from '@/api/errors/AppError';
import { Usuario } from '@/schemas/Usuario';

interface IBuscarTodosUsuariosUseCaseRequest {
    pesquisa?: string;
    pagina: number;
    limite: number;
    situacao?: number;
    statusChat?: number;
    administrador?: boolean;
}

export class BuscarTodosUsuarioUseCase {
    async execute(data: IBuscarTodosUsuariosUseCaseRequest) {
        const {
            pesquisa,
            pagina,
            limite,
            situacao,
            statusChat,
            administrador,
        } = data;

        const query = [];

        if (pesquisa) {
            query.push({
                $or: [
                    { primeiroNome: { $regex: pesquisa, $options: 'i' } },
                    { nomeCompleto: { $regex: pesquisa, $options: 'i' } },
                    { email: { $regex: pesquisa, $options: 'i' } },
                ],
            });
        }

        if (situacao) query.push({ situacao });
        if (statusChat) query.push({ statusChat });
        if (administrador) query.push({ administrador });

        try {
            const usuarios = await Usuario.find(
                query.length > 0 ? { $and: query } : {},
            ).limit(limite).skip((pagina - 1) * limite);

            const count = await Usuario.countDocuments(query.length > 0 ? { $and: query } : {});

            return {
                pagina,
                limite,
                count,
                data: usuarios,
            };
        } catch (err) {
            console.log(err);
            throw new AppError('');
        }
    }
}
