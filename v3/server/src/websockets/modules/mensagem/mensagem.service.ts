import { PrismaService } from '@/database/PrismaService';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MensagemService {
    constructor(private prisma: PrismaService) {}

    async findById(id: string) {
        return this.prisma.mensagem.findUnique({
            where: { id }
        })
    }

    async findByChat(idChat: number | bigint) {
        return this.prisma.mensagem.findMany({
            where: {
                idChat
            }
        })
    }

    async create(data: Prisma.MensagemUncheckedCreateInput) {
        return this.prisma.mensagem.create({
            data,
            include: {
                usuario: {
                    select: {
                        id: true,
                        primeiroNome: true,
                        email: true,
                        foto: true,
                        socketId: true,
                    }
                },
                cliente: true,
                chat: true
            }
        })
    }
}
