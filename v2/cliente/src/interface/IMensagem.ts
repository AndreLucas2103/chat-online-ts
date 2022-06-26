export interface IMessage {
    idChat: string;
    idUsuario?: string;
    enviadaPorCliente: boolean;
    conteudo: string;
    createdAt: Date;
}