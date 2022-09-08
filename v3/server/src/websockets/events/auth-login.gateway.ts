import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class AuthLoginGateway {
    @SubscribeMessage('auth_login')
    handleMessage(
        client: Socket,
        @MessageBody() data: { email: string; password: string }
    ) {
        console.log(data)
    }
}
