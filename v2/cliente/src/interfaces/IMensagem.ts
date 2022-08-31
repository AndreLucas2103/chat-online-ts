export interface IMensagem {
    _id: string;
    idCliente: string | null;
    idUsuario: string | null;
    idChat: string;
    mensagem: string;
    data: Date;
}