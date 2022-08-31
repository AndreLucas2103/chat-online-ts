import mongoose, { Schema, Types } from 'mongoose';

interface ICliente {
    _id: Types.ObjectId;
    nome: string;
    foto: string;
    email: string;
}

const ClienteSchema = new Schema<ICliente>({
    nome: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Cliente = mongoose.model<ICliente>('Clientes', ClienteSchema);

export { Cliente };
