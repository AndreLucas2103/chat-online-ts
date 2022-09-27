import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketAdapter extends IoAdapter {
    createIOServer(
        port: number,
        options?: ServerOptions & {
            namespace?: string;
            server?: any;
        },
    ) {
        const server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: '*',
            },
            pingTimeout: 2000 // tempo que o servidor vai ficar esperando o socket reconectar 
        } as ServerOptions);
        return server;
    }
}