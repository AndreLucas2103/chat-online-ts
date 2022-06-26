import mongoose, { Document, Schema, Types } from "mongoose";

type Usuario = Document & {
    email: string;
    socketId: string;
    nome: string;
    status: string;
    foto: string;
}

const UsuarioSchema = new Schema<Usuario>({
    email: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    socketId: String,
    status: {
        type: String,
        enum: ["online", "offline", "ausente", "ocupado"],
        default: "offline"
    },
    foto: {
        type: String,
        default: "https://www.inhouse.com.br/wp-content/uploads/2018/10/headset.png"
    }
})

const Usuario = mongoose.model<Usuario>("Usuarios", UsuarioSchema);

export { Usuario };