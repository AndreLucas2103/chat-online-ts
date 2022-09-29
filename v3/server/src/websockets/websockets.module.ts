import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { SocketModule } from './modules/socket/socket.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ChatModule } from './modules/chat/chat.module';
import { MensagemModule } from './modules/mensagem/mensagem.module';

@Module({
    imports: [
        UsuarioModule,
        SocketModule,
        ClienteModule,
        ChatModule,
        MensagemModule,
    ],
})
export class WebsocketsModule {}
