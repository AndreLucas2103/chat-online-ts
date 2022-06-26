import { SET_CHAT } from "../../types/chatTypes";

export interface IChatRedux {
    _id?: string
    idChat?: string;
    nome?: string;
    socketId?: string;
    createdAt?: Date;
    status?: string;
}

export interface IChatReducer {
    chat: IChatRedux
}

const INITIAL_STATE: IChatReducer = {
    chat: {
        _id: undefined,
        idChat: undefined,
        nome: undefined,
        socketId: undefined,
        createdAt: undefined,
        status: undefined,
    }
};

export default function ChatReducer(state = INITIAL_STATE, action: { payload: IChatReducer, type: string }) {
    switch (action.type) {

        case SET_CHAT:
            return { ...state, chat: action.payload.chat };

        default:
            return state;
    }
};