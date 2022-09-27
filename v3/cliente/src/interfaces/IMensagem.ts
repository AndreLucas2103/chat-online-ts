export interface IMensagem {
    id: string;
    idCliente: string | null;
    idUsuario: string | null;
    idChat: string;
    mensagem: string;
    data: Date;
}