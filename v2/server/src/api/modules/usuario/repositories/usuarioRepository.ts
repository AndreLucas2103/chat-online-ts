import { Usuario } from "../../../../schema/Usuario";

export interface IUsuario {
    email: string;
    nome: string;
    foto?: string;
}

export interface IUsuarioRepository {
    criar(data: IUsuario): Promise<void>;
    buscarEmail(email: string): Promise<Usuario | null>;
}