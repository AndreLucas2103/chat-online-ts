import { Socket } from 'socket.io';
import { Usuario } from '../../schemas/Usuario';

export async function disconnectService(socket: Socket): Promise<void> {
    const usuario = await Usuario.findOne({ socketId: socket.id });

    if (!usuario) return;

    usuario.statusChat = 3;
    usuario.socketId = null;
    usuario.qtdChatsPassaramFila = 0;

    await usuario.save();
}
