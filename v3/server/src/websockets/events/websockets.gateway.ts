import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class WebsocketsGateway {

    @SubscribeMessage('events')
    handle(
        io: Server,
        socket: Socket
    ) {
        return 'ok'
    }

}
