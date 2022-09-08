import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class MensagemService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.MensagemCreateInput) {
        return this.prisma.mensagem.create({ data });
    }
}
