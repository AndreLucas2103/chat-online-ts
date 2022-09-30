import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Socket } from 'socket.io';

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
            pingInterval: 25,
            pingTimeout: 99999,
            connectTimeout: 86400,
        } as ServerOptions);
        return server;
    }
}