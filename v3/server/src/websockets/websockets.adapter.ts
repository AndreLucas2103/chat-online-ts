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
            /* pingTimeout: 50000 */ // tempo que o servidor vai ficar esperando o socket reconectar 
        } as ServerOptions);
        return server;
    }

    async handleConnection(client: Socket, ...args: any[]) {
        client.setMaxListeners(20);
    }
}