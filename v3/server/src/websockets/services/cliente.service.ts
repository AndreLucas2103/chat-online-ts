import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class ClienteService {
    constructor(private prisma: PrismaService) {}

    async findById(id: number) {
        return this.prisma.cliente.findUnique({
            where: { id }
        })
    }

    async findOne(email: string, nome: string) {
        return this.prisma.cliente.findFirst({
            where: { email, nome }
        })
    }
}
