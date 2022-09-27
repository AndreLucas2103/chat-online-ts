import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { SocketModule } from './modules/socket/socket.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
    imports: [
        UsuarioModule,
        SocketModule,
        ClienteModule,
        ChatModule,
    ]
})
export class WebsocketsModule {}
