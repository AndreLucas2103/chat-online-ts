import { Socket } from "socket.io";
import { Usuario } from "../../schema/Usuario";
import { CallbackError } from "../error/CallbackError";

export async function usuarioLogin(
    socket: Socket,
    data: { email: string },
    callback: Function
): Promise<void> {
    try {
        const usuarioExiste = await Usuario.findOne({ email: data.email });

        if (!usuarioExiste) {
            return callback({ erro: new CallbackError('Usuário não existe') });
        }

        usuarioExiste.socketId = socket.id;
        usuarioExiste.status = 'online';

        await usuarioExiste.save();

        return callback({ data: usuarioExiste });
    } catch (err) {
        return callback({ erro: new CallbackError() });
    }
}