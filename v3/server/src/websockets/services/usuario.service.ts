import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    async findById(id: number) {
        return this.prisma.usuario.findUnique({
            where: { id },
        })
    }

    async findBySocketId(socketId: string) {
        return this.prisma.usuario.findFirst({
            where: {
                socketId
            }
        })
    }

    async update(id: number, data: Prisma.UsuarioUpdateInput) {
        await this.prisma.usuario.update({
            where: { id },
            data,
        })
    }

    async findListAndCount() {
        return this.prisma.usuario.findMany({
            where: {
                situacao: 1,
            },
            select: {
                id: true,
                socketId: true,
                primeiroNome: true,
                nomeCompleto: true,
                email: true,
                foto: true,
                administrador: true,
                statusChat: true,
                _count: {
                    select: {
                        usuarioFila: true,
                        usuarioResponsavel: true,
                    }
                },
            }
        })
    }
}
