import { IUsuario } from "interfaces/IUsuario";
import { SET_CHAT } from "../../types/chatTypes";

interface IChatRedux {
    id: number;
    situacao: 1 | 2 | 3; // 1-aguardando, 2-andamento, 3-finalizado
    uuid: string;
    usuarioAtendimento: IUsuario | null;
}

interface IChatReducer {
    chat: IChatRedux | null;
}

const INITIAL_STATE: IChatReducer = {
    chat: null
};

type ChatReduxActionType =
    | { type: typeof SET_CHAT, payload: IChatRedux }

export function ChatReducer(state = INITIAL_STATE, action: ChatReduxActionType) {
    switch (action.type) {

        case SET_CHAT:
            return { ...state, chat: action.payload };

        default:
            return state;
    }
};