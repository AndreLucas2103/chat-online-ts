import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from '../../../database/PrismaService';

interface IFindListAndCountChat extends Usuario {
    count_usuarioResponsavel: number;
    count_usuarioFila: number;
}

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    async findById(id: number | bigint): Promise<Usuario> {
        return this.prisma.usuario.findUnique({
            where: { id },
        })
    }

    async findBySocketId(socketId: string): Promise<Usuario> {
        return this.prisma.usuario.findFirst({
            where: {
                socketId
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.usuario.findUnique({
            where: { email }
        })
    }

    async update(id: number | bigint, data: Prisma.UsuarioUpdateInput) {
        return await this.prisma.usuario.update({
            where: { id },
            data,
        })
    }

    async findListAndCountChat(): Promise<IFindListAndCountChat[]> {
        return await this.prisma.$queryRaw`
            SELECT
                *,
                (
                    SELECT COUNT(chat.idUsuarioResponsavel)
                    FROM chat
                    WHERE chat.idUsuarioResponsavel = usuario.id AND chat.situacao = 2
                ) as count_usuarioResponsavel,
                (
                    SELECT COUNT(chat.idUsuarioFila)
                    FROM chat
                    WHERE chat.idUsuarioFila = usuario.id
                ) as count_usuarioFila
            FROM usuario
        `
    }

    async findUsuarioProximoChat(): Promise<IFindListAndCountChat | null> {
        const usuarios = await this.prisma.$queryRaw<IFindListAndCountChat[]>`
                SELECT
                    *,
                    (
                        SELECT COUNT(chat.idUsuarioResponsavel)
                        FROM chat
                        WHERE chat.idUsuarioResponsavel = usuario.id AND chat.situacao = 2
                    ) as count_usuarioResponsavel,
                    (
                        SELECT COUNT(chat.idUsuarioFila)
                        FROM chat
                        WHERE chat.idUsuarioFila = usuario.id
                    ) as count_usuarioFila
                FROM usuario
                WHERE usuario.statusChat = 1
            `
        if (usuarios.length < 1) return null // nenhum usuario está online
        if (usuarios.length === 1) return usuarios[0] // se tiver somente um, já vai para ele

        const menorNumeroResponsavel = Math.min(...usuarios.map(u => u.count_usuarioResponsavel)) // pega o menor numero de atendimentos em adamento dos usuarios online

        const usuariosMenorNumeroResponsavel = usuarios // filtra todos os usuarios que possuem o meno numero
            .filter(u => u.count_usuarioResponsavel === menorNumeroResponsavel)

        if (usuariosMenorNumeroResponsavel.length === 1) return usuariosMenorNumeroResponsavel[0] // se tiver somente um com menor numero de atendimetno em andamento, vai para ele

        // caso tiver mais de um usuario com o mesmo valor de menor quantidade de atendimento, valido a quantidade de chats que está na fila
        const menorNumeroFila = Math.min(...usuariosMenorNumeroResponsavel.map(u => u.count_usuarioFila))

        const usuariosMenorNumeroFila = usuariosMenorNumeroResponsavel // filtra por todos que tem o menor numero na fila
            .filter(u => u.count_usuarioFila === menorNumeroFila)

        /* console.log("UsersResponsavel:")
        console.log(usuariosMenorNumeroResponsavel.map(u => ({
            primeiroNome: u.primeiroNome,
            countFila: u.count_usuarioFila,
            countResponsavel: u.count_usuarioResponsavel
        })))
        console.log("MenorNumeroFila: " + menorNumeroFila)
        console.log("UsersMenorFila:")
        console.log(usuariosMenorNumeroFila.map(u => ({
            primeiroNome: u.primeiroNome,
            countFila: u.count_usuarioFila,
            countResponsavel: u.count_usuarioResponsavel
        })))
        console.log("-------- END --------") */

        if (usuariosMenorNumeroFila.length === 1) return usuariosMenorNumeroFila[0] // se tiver somente um já vai para ele

        const usuario = usuariosMenorNumeroFila[Math.floor(Math.random() * usuariosMenorNumeroFila.length)] // se tiver mais de um, é selecionado um aleatorio

        return usuario
    }
}
