import { io } from '../http';

io.on('connect', (socket) => {
    console.log(socket);
});
