import { PrismaService } from '@/database/PrismaService';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthLoginGateway } from './events/auth-login.gateway';
import { UsuarioAtualizarStatusGateway } from './events/usuario_atualizar_status.gateway';
import { ChatService } from '../chat/chat.service';
import { ClienteService } from '../cliente/cliente.service';

@Module({
    providers: [
        PrismaService,
        UsuarioService,
        ChatService,
        ClienteService,
        AuthLoginGateway,
        UsuarioAtualizarStatusGateway
    ],
})
export class UsuarioModule {}
