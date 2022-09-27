import { PrismaService } from '@/database/PrismaService';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    async findById(id: number | bigint) {
        return await this.prisma.chat.findUnique({
            where: { id }
        })
    }

    async findMany(where: Prisma.ChatWhereInput) {
        return await this.prisma.chat.findMany({
            where,
            include: {
                cliente: true,
                usuarioFila: {
                    select: {
                        id: true,
                        nomeCompleto: true,
                        primeiroNome: true,
                        email: true,
                        foto: true,
                        socketId: true,
                        statusChat: true,
                        situacao: true,
                        administrador: true,
                    }
                },
                usuarioResponsavel: {
                    select: {
                        id: true,
                        nomeCompleto: true,
                        primeiroNome: true,
                        email: true,
                        foto: true,
                        socketId: true,
                        statusChat: true,
                        situacao: true,
                        administrador: true,
                    }
                }
            }
        })
    }

    async create(data: Prisma.ChatUncheckedCreateInput) {
        return await this.prisma.chat.create({
            data
        })
    }

    async update(id: number | bigint, data: Prisma.ChatUncheckedUpdateInput) {
        return await this.prisma.chat.update({
            where: { id },
            data
        })
    }

    async updateMany(where: Prisma.ChatWhereInput, data: Prisma.ChatUncheckedUpdateInput) {
        return await this.prisma.chat.updateMany({
            where,
            data
        })
    }
}
