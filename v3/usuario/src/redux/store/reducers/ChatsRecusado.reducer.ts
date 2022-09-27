import { IChat } from 'interfaces/IChat'
import { CHATS_RECUSADO_ADICIONAR, CHATS_RECUSADO_REMOVER } from 'redux/types/chatsRecusado.types'

const INITIAL_STATE: IChat[] = []

type ChatsRecusadoReduxType =
    | { type: typeof CHATS_RECUSADO_ADICIONAR, payload: IChat }
    | { type: typeof CHATS_RECUSADO_REMOVER, payload: number }

export function ChatsRecusadoReducer(state = INITIAL_STATE, action: ChatsRecusadoReduxType) {
    switch (action.type) {

        case CHATS_RECUSADO_ADICIONAR:
            return [...state, action.payload]

        case CHATS_RECUSADO_REMOVER:
            return state.filter(s => s.id !== action.payload)

        default:
            return state;
    }
};
