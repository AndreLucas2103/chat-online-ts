import mongoose, { Schema, Types } from 'mongoose';

interface IMensagem {
    idChat: Types.ObjectId;
    idUsuario: Types.ObjectId | null;
    idCliente: Types.ObjectId | null;
    mensagem: string;
    data: Date;
}

const MensagemSchema = new Schema<IMensagem>({
    idChat: {
        type: Schema.Types.ObjectId,
        ref: 'Chats',
        required: true,
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        default: null,
    },
    idCliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        default: null,
    },
    mensagem: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

const Mensagem = mongoose.model<IMensagem>('Mensagens', MensagemSchema);

export { Mensagem };
