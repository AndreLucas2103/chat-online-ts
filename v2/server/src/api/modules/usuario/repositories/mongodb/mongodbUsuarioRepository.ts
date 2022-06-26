import { Usuario } from "../../../../../schema/Usuario";
import { IUsuario, IUsuarioRepository } from "../usuarioRepository";

export class MongodbUsuarioRepository implements IUsuarioRepository {
    async criar(data: IUsuario): Promise<void> {
        await Usuario.create(data);
    }

    async buscarEmail(email: string): Promise<Usuario | null> {
        return Usuario.findOne({ email });
    }
}