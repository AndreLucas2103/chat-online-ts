import { Request, Response } from "express";
import { MongodbUsuarioRepository } from "../../repositories/mongodb/mongodbUsuarioRepository";
import { CriarUsuarioUseCase } from "./criarUsuarioUseCase";

export class CriarUsuarioController {
    async handle(req: Request, res: Response): Promise<Response> {

        const {
            email,
            nome,
            foto
        } = req.body


        if (!email) return res.status(422).send("Email obrigatório")
        if (!nome) return res.status(422).send("Nome obrigatório")

        const mongodbUsuarioRepository = new MongodbUsuarioRepository()
        const criarUsuarioUseCase = new CriarUsuarioUseCase(mongodbUsuarioRepository)

        await criarUsuarioUseCase.execute({
            email, nome, foto
        })

        return res.status(200).send()
    }
}