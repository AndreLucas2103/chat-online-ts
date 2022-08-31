import { io } from '../http';
import { clienteIniciarChatService } from './services/clienteIniciarChatService';
import { loginUsuarioService } from './services/loginUsuarioService';
import { disconnectService } from './services/disconnectService';
import { usuarioAtualizarStatus } from './services/usuarioAtualizarStatus';
import { novaMensagemService } from './services/novaMensagemService';
import { usuarioAceitarChat } from './services/usuarioAceitarChatService';

io.on('connect', (socket) => {
    socket.on('auth_login', (data, callback) => loginUsuarioService(socket, data, callback));

    socket.on('usuario_atualizar_status', (data, callback) => usuarioAtualizarStatus(socket, data, callback));

    socket.on('cliente_iniciar_chat', (data, callback) => clienteIniciarChatService(io, socket, data, callback));

    socket.on('usuario_aceitar_chat', (data, callback) => usuarioAceitarChat(socket, data, callback));

    socket.on('nova_mensagem', (data) => novaMensagemService(io, socket, data));

    socket.on('disconnect', () => disconnectService(socket));
});
