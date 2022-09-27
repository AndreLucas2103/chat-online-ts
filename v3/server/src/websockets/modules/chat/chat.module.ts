import { PrismaService } from '@/database/PrismaService';
import { Module } from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ChatService } from './chat.service';
import { UsuarioAceitarChatGateway } from './events/usuario-aceitar-chat.gateway';

@Module({
    providers: [PrismaService, ChatService, UsuarioService, ClienteService, UsuarioAceitarChatGateway]
})
export class ChatModule {}
