import mongoose, { Schema, Types } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

interface IChat {
    idCliente: Types.ObjectId;
    socketId: string;
    uuid: string;
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    idUsuarioFila: Types.ObjectId | null;
    idUsuarioAtendimento: Types.ObjectId | null;
    dataInicio: Date;
    dataFim: Date | null;
}

const ChatSchema = new Schema<IChat>({
    idCliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true,
    },
    socketId: {
        type: String,
        required: true,
    },
    situacao: {
        type: Number,
        required: true,
        enum: [1, 2, 3],
        default: 1,
    },
    idUsuarioFila: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        default: null,
    },
    idUsuarioAtendimento: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        default: null,
    },
    uuid: {
        type: String,
        required: true,
        default: uuidV4,
    },
    dataInicio: {
        type: Date,
        required: true,
        default: new Date(),
    },
    dataFim: {
        type: Date,
        default: null,
    },
});

const Chat = mongoose.model<IChat>('Chats', ChatSchema);

export { Chat };
