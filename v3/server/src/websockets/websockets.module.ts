import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './events/websockets.gateway';
import { UsuarioService } from './services/usuario.service';
import { ChatService } from './services/chat.service';
import { MensagemService } from './services/mensagem.service';
import { ClienteService } from './services/cliente.service';
import { PrismaService } from '../database/PrismaService';
import { AuthLoginGateway } from './events/auth-login.gateway';

@Module({
    providers: [WebsocketsGateway, UsuarioService, ChatService, MensagemService, ClienteService, PrismaService, AuthLoginGateway]
})
export class WebsocketsModule {}
