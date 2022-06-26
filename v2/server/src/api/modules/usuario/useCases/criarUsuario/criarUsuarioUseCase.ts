import { AppError } from "../../../../errors/AppError";
import { IUsuarioRepository } from "../../repositories/usuarioRepository";

interface ICriarUsuarioUseCaseRequest {
    email: string;
    nome: string;
    foto?: string
}

export class CriarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) {}

    async execute(data: ICriarUsuarioUseCaseRequest) {
        const usuarioExiste = await this.usuarioRepository.buscarEmail(data.email);

        if (usuarioExiste) {
            throw new AppError("Usuário já existe", 422);
        }

        await this.usuarioRepository.criar({
            email: data.email,
            nome: data.nome,
            foto: data.foto
        });
    }
}