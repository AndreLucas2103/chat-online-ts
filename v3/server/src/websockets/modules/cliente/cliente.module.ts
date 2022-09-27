import { PrismaService } from '@/database/PrismaService';
import { Module } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ClienteService } from './cliente.service';
import { ClienteIniciarChatGateway } from './events/cliente-iniciar-chat.gateway';

@Module({
    providers: [
        PrismaService,
        ChatService,
        UsuarioService,
        ClienteService,
        ClienteIniciarChatGateway
    ]
})
export class ClienteModule {}
