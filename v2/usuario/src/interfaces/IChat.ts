export interface IChat {
    _id: string;
    cliente: {
        nome: string;
        foto: string;
        email: string;
    };
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    idUsuarioFila: string | null;
    uuid: string;
    novaMensagem: number;
    segundosFila: number;
    dataInicio: Date | string;
}