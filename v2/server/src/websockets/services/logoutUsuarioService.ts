import { Usuario } from 'schemas/Usuario';
import { Socket } from 'socket.io';

export async function logoutUsuarioService(socket: Socket): Promise<void> {
    const usuario = await Usuario.findOne({ socketId: socket.id });

    if (!usuario) return;

    usuario.statusChat = 2;
    usuario.socketId = null;

    await usuario.save();
}
