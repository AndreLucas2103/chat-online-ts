import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { Chat } from "../../schema/Chat";
import { Mensagem } from "../../schema/Mensagem";
import { Usuario } from "../../schema/Usuario";
import { CallbackError } from "../error/CallbackError";

export async function getMensagens(
    data: {
        _idChat: string,
    },
    callback: Function
): Promise<void> {
    const mensagens = await Mensagem.find({
        idChat: data._idChat,
    })

    callback({
        data: mensagens,
    });
}