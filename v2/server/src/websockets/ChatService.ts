import { io } from '../http';
import { loginUsuarioService } from './services/loginUsuarioService';
import { logoutUsuarioService } from './services/logoutUsuarioService';

io.on('connect', (socket) => {
    socket.on('auth_login', (data, callback) => loginUsuarioService(socket, data, callback));

    socket.on('disconnect', () => logoutUsuarioService(socket));
});
