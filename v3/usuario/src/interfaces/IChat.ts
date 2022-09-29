import { ICliente } from "./ICliente";
import { IUsuario } from "./IUsuario";

export interface IChat {
    id: number;
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    uuid: string;
    dataInicio: Date | string;
    dataFim: Date | string | null;

    idCliente: number | null;
    idUsuarioResponsavel: number | null;
    idUsuarioFila: number | null;

    cliente?: ICliente | null;
    usuarioResponsavel?: IUsuario | null;
    usuarioFila?: IUsuario | null;

    // fields para controle no chat, não existem no server esses campos
    novaMensagem?: number;
    segundosFila?: number;
    recusado?: boolean;
}