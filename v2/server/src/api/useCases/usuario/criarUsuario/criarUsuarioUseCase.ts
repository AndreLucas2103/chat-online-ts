import bcrypt from 'bcryptjs';
import { Usuario } from '@/schemas/Usuario';
import { AppError } from '@/api/errors/AppError';

interface ICriarUsuarioUseCaseRequest {
    primeiroNome: string;
    nomeCompleto: string;
    email: string;
    senha: string;
}
export class CriarUsuarioUseCase {
    async execute(data: ICriarUsuarioUseCaseRequest): Promise<void> {
        try {
            await Usuario.create({
                primeiroNome: data.primeiroNome,
                nomeCompleto: data.nomeCompleto,
                email: data.email,
                senha: await bcrypt.hash(data.senha, 10),
                socketId: null,
            });
        } catch (err) {
            throw new AppError('Erro ao criar usuário', 500);
        }
    }
}
