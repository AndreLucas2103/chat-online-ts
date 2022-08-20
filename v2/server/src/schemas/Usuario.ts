import mongoose, { Schema } from 'mongoose';

interface IUsuario {
    primeiroNome: string;
    nomeCompleto: string;
    email: string;
    senha: string;
    foto: string;
    administrador: boolean;
    situacao: 1 | 2; // 1-ativo, 2-inativo
    statusChat: 1 | 2 | 3; // 1-online, 2-ausente, 3-offline
    socketId: string | null;
}

const UsuarioSchema = new Schema<IUsuario>({
    primeiroNome: {
        type: String,
        required: true,
    },
    nomeCompleto: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    foto: {
        type: String,
        required: true,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    },
    administrador: {
        type: Boolean,
        default: false,
    },
    situacao: {
        type: Number,
        required: true,
        enum: [1, 2],
        default: 1,
    },
    statusChat: {
        type: Number,
        required: true,
        enum: [1, 2, 3],
        default: 3,
    },
    socketId: {
        type: String,
        default: null,
    },
});

const Usuario = mongoose.model<IUsuario>('Usuarios', UsuarioSchema);

export { Usuario };
