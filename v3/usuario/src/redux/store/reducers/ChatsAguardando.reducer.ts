import { IChat } from 'interfaces/IChat'
import { CHATS_AGUARDANDO_ADICIONAR, CHATS_AGUARDANDO_REMOVER, CHATS_AGUARDANDO_CRON_SEGUNDOS_FILA, CHATS_AGUARDANDO_REMOVER_TODOS } from '../../types/chatsAguardando.types'

const INITIAL_STATE: IChat[] = []

type ChatsAguardandoReduxType =
    | { type: typeof CHATS_AGUARDANDO_ADICIONAR, payload: IChat }
    | { type: typeof CHATS_AGUARDANDO_REMOVER, payload: number }
    | { type: typeof CHATS_AGUARDANDO_CRON_SEGUNDOS_FILA, payload: IChat[] }
    | { type: typeof CHATS_AGUARDANDO_REMOVER_TODOS, payload: null }

export function ChatsAguardandoReducer(state = INITIAL_STATE, action: ChatsAguardandoReduxType) {
    switch (action.type) {

        case CHATS_AGUARDANDO_ADICIONAR:
            return [...state, action.payload]

        case CHATS_AGUARDANDO_REMOVER:
            return state.filter(s => s.id !== action.payload)

        case CHATS_AGUARDANDO_CRON_SEGUNDOS_FILA:
            return action.payload

        case CHATS_AGUARDANDO_REMOVER_TODOS:
            return []

        default:
            return state;
    }
};
