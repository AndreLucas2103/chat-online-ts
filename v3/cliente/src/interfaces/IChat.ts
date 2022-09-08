export interface IChat {
    _id: string;
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    uuid: string;
}