export interface IChat {
    id: number;
    cliente: {
        nome: string;
        foto: string;
        email: string;
    };
    socketId: string;
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    idUsuarioFila: number | null;
}