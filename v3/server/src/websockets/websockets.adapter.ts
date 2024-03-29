import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions, Socket } from 'socket.io';

export class SocketAdapter extends IoAdapter {
    createIOServer(
        port: number,
        options?: ServerOptions & {
            namespace?: string;
            server?: any;
        },
    ) {
        const server: Server = super.createIOServer(port, {
            ...options,
            transports: ['polling', 'websocket'],
            cors: {
                origin: '*',
            },
            pingInterval: 1000,
            pingTimeout: 10000
        } as ServerOptions);

        return server;
    }
}