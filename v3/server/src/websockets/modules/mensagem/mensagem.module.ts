import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { NovaMensagemGateway } from './events/nova-mensagem.gateway';
import { ChatService } from '../chat/chat.service';
import { PrismaService } from '@/database/PrismaService';

@Module({
    providers: [
        PrismaService,
        MensagemService,
        ChatService,
        NovaMensagemGateway,
    ]
})
export class MensagemModule {}
