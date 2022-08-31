import { SET_CHATS_ANDAMENTO, SET_CHATS_FILA_ESPERA, SET_CHATS_RECUSADOS } from "redux/types/chatTypes";

interface IChatRedux {
    _id: string;
    cliente: {
        nome: string;
        foto: string;
        email: string;
    };
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    idUsuarioFila: string | null;
    novaMensagem: number;
    uuid: string;
    segundosFila: number;
    dataInicio: Date | string;
}

interface IChatsRedux {
    chatsFilaEspera: IChatRedux[];
    chatsAndamento: IChatRedux[];
    chatsRecusados: IChatRedux[];
}

const INITIAL_STATE: IChatsRedux = {
    chatsFilaEspera: [],
    chatsAndamento: [],
    chatsRecusados: [],
};

type ChatReduxActionType =
    | { type: typeof SET_CHATS_FILA_ESPERA, payload: IChatRedux[] }
    | { type: typeof SET_CHATS_ANDAMENTO, payload: IChatRedux[] }
    | { type: typeof SET_CHATS_RECUSADOS, payload: IChatRedux[] }

export function ChatReducer(state = INITIAL_STATE, action: ChatReduxActionType) {
    switch (action.type) {

        case SET_CHATS_FILA_ESPERA:
            return { ...state, chatsFilaEspera: action.payload };

        case SET_CHATS_ANDAMENTO:
            return { ...state, chatsAndamento: action.payload };

        case SET_CHATS_RECUSADOS:
            return { ...state, chatsRecusados: action.payload };

        default:
            return state;
    }
};
