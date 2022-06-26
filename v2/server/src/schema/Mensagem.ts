import mongoose, { Document, Schema, Types } from "mongoose";
import { Chat } from "./Chat";

interface Mensagem {
    idChat: Types.ObjectId
    idUsuario?: Types.ObjectId;
    enviadaPorCliente: boolean;
    conteudo: string;
    createdAt: Date;
}

const MensagemSchema = new Schema<Mensagem>({
    idChat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        required: false
    },
    enviadaPorCliente: {
        type: Boolean,
        default: false
    },
    conteudo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Mensagem = mongoose.model<Mensagem>("Mensagens", MensagemSchema);

export { Mensagem };