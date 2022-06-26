import mongoose, { Schema, Types } from "mongoose";
import { v4 as uuidV4 } from "uuid";

interface Chat {
    idUsuarios: Types.ObjectId[];
    idChat: string;
    nome: string;
    socketId: string;
    createdAt: Date;
    status: string;
}

const ChatSchema = new Schema<Chat>({
    idChat: {
        type: String,
        default: uuidV4
    },
    nome: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
    },
    idUsuarios: [{
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
    }],
    status: {
        type: String,
        enum: ["andamento", "encerrrado"],
        default: "andamento"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.model<Chat>('Chats', ChatSchema);

export { Chat };