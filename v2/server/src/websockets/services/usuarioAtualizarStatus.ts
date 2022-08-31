import { Socket } from 'socket.io';
import { Usuario } from '../../schemas/Usuario';

interface IUsuarioAtualizarStatusData {
    statusChat: number;
    idUsuario: string;
}

export async function usuarioAtualizarStatus(
    socket: Socket,
    data: IUsuarioAtualizarStatusData,
    callback: Function,
): Promise<void> {
    await Usuario.updateOne({
        _id: data.idUsuario,
    }, {
        statusChat: data.statusChat,
    });

    const usuarios = await Usuario.aggregate([
        {
            $match: {
                statusChat: {
                    $in: [1, 2],
                },
            },
        },
    ]);

    callback();

    socket.emit('usuarios_logados', usuarios);
}
