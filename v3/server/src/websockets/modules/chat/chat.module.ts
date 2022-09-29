import { PrismaService } from '@/database/PrismaService';
import { Module } from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ChatService } from './chat.service';
import { UsuarioAceitarChatGateway } from './events/usuario-aceitar-chat.gateway';
import { UsuarioRecusarChatGateway } from './events/usuario-recusar-chat.gateway';
import { ChatlogService } from './chatlog.service';

@Module({
    providers: [
        PrismaService,
        ChatService,
        UsuarioService,
        ClienteService,
        UsuarioAceitarChatGateway,
        UsuarioRecusarChatGateway,
        ChatlogService
    ]
})
export class ChatModule {}
