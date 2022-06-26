import { Socket } from "socket.io";
import { Usuario } from "../../schema/Usuario";
import { CallbackError } from "../error/CallbackError";

export async function disconnectChat(
    socket: Socket,
): Promise<void> {
    const usuario = await Usuario.findOne({ socketId: socket.id });

    if (usuario) {
        usuario.status = 'offline';

        await usuario.save();
    }
}