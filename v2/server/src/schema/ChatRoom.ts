import mongoose, { Document, Schema, Types } from "mongoose";
import { Atendente } from "./Atendente";
import { v4 as uuidV4 } from "uuid";

type ChatRoom = Document & {
    _id: Types.ObjectId;
    idAtendentes: Atendente[];
    idChatRoom: string;
    mensagens: {
        idAtendente: Atendente[];
        conteudo: string;
        createdAt: Date;
    }[];
    createdAt: Date
}

const ChatRoomSchema = new Schema<ChatRoom>({
    _id: Types.ObjectId,
    idChatRoom: {
        type: String,
        default: uuidV4
    },
    idAtendentes: [{
        type: Schema.Types.ObjectId,
        ref: "Atendentes"
    }],
    mensagens: [{
        idAtendente: {
            type: Schema.Types.ObjectId,
            ref: "Atendentes"
        },
        conteudo: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ChatRoom = mongoose.model<ChatRoom>('ChatRoom', ChatRoomSchema);

export { ChatRoom };