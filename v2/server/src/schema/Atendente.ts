import mongoose, { Document, Schema, Types } from "mongoose";

type Atendente = Document & {
    _id: Types.ObjectId;
    email: string;
    socket_id: string;
    nome: string;
    status: string;
    foto: string;
}

const AtendenteSchema = new Schema<Atendente>({
    _id: Types.ObjectId,
    email: String,
    socket_id: String,
    nome: String,
    status: {
        type: String,
        enum: ["online", "offline", "ausente", "ocupado"],
    },
    foto: {
        type: String,
        default: "https://www.inhouse.com.br/wp-content/uploads/2018/10/headset.png"
    }
})

const Atendente = mongoose.model<Atendente>("Atendentes", AtendenteSchema);

export { Atendente };