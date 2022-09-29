import { PrismaService } from '@/database/PrismaService';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatlogService {
    constructor(
        private prisma: PrismaService
    ) {}

    async create(data: Prisma.ChatLogUncheckedCreateInput) {
        return await this.prisma.chatLog.create({
            data
        })
    }

    async findIdChat(idChat: number | bigint) {
        return await this.prisma.chatLog.findMany({
            where: {
                idChat,
            }
        })
    }
}
