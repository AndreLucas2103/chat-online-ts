export interface IMensagem {
    _id: string;
    idChat: string;
    idUsuario?: string;
    enviadaPorCliente: boolean;
    conteudo: string;
    createdAt: Date;
}