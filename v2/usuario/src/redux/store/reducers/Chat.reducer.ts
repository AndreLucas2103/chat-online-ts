
interface IChatRedux {
    id: string;
    cliente: {
        nome: string;
        foto: string;
        email: string;
    };
    socketId: string;
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    idUsuarioFila: string | null;
    novaMensagem: number;
    uuid: string;
}

interface IChatsRedux {
    chatsFIlaEspera: IChatRedux[];
    chatsAndamento: IChatRedux[];
}

const INITIAL_STATE: IChatsRedux = {
    chatsFIlaEspera: [],
    chatsAndamento: []
};

export function ChatReducer(state = INITIAL_STATE, action: { payload: IChatsRedux, type: string }) {
    switch (action.type) {

        case "SET_USUARIO":
            return { ...state, usuario: action.payload.chatsFIlaEspera };

        default:
            return state;
    }
};