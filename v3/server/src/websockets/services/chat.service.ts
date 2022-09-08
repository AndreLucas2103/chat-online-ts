import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    async update(id: number, data: Prisma.ChatUpdateInput) {
        await this.prisma.chat.update({
            where: { id },
            data
        })
    }
}
