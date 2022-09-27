import { PrismaService } from '@/database/PrismaService';
import { Module } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ConnectionGateway } from './events/connection.gateway';
import { DisconnectGateway } from './events/disconnect.gateway';

@Module({
    providers: [
        PrismaService,
        UsuarioService,
        ClienteService,
        ChatService,
        ConnectionGateway,
        DisconnectGateway
    ]
})
export class SocketModule {}
