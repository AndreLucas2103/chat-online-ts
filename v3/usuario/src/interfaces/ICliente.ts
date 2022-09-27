export interface ICliente {
    id: number;
    nome: string;
    email: string;
    socketId?: string | null;
    foto: string;
}