import { PrismaService } from '@/database/PrismaService';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClienteService {
    constructor(private prisma: PrismaService) {}

    async findById(id: number | bigint) {
        return await this.prisma.cliente.findUnique({
            where: { id }
        })
    }

    async findOne(email: string, nome: string) {
        return await this.prisma.cliente.findFirst({
            where: { email, nome }
        })
    }

    async findBySocketId(socketId: string) {
        return await this.prisma.cliente.findFirst({
            where: { socketId }
        })
    }

    async create(data: Prisma.ClienteCreateInput) {
        return await this.prisma.cliente.create({
            data
        })
    }

    async update(id: number | bigint, data: Prisma.ClienteUpdateInput) {
        return await this.prisma.cliente.update({
            where: { id },
            data
        })
    }
}
