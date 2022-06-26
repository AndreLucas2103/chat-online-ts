import { IUsuario } from "./IUsuario";

export interface IChat {
    _id: string;
    idChat: string;
    nome: string;
    socketId: string;
    createdAt: Date;
    status: string;
}