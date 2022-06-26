import { io } from '../http';
import { clienteInicarChat } from './services/clienteIniciarChat';
import { disconnectChat } from './services/disconectChat';
import { enviarMensagem } from './services/enviarMensagem';
import { getMensagens } from './services/getMensagens';
import { usuarioEntrarChat } from './services/usuarioEntrarChat';
import { usuarioLogin } from './services/usuarioLogin';

io.on('connect', socket => {
    socket.on('cliente_inicar_chat', (data, callback) => clienteInicarChat(io, socket, data, callback))

    socket.on('usuario_login', (data, callback) => usuarioLogin(socket, data, callback));
    socket.on('usuario_entrar_chat', (data, callback) => usuarioEntrarChat(io, socket, data, callback));

    socket.on('enviar_mensagem', (data, callback) => enviarMensagem(io, socket, data, callback));
    socket.on('get_mensagens', (data, callback) => getMensagens(data, callback));

    socket.on('disconnect', () => disconnectChat(socket));
})

