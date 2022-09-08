export interface IChat {
    id: number;
    cliente: {
        nome: string;
        foto: string;
        email: string;
    };
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    idUsuarioFila: number | null;
    uuid: string;
    novaMensagem: number;
    segundosFila: number;
    dataInicio: Date | string;
}