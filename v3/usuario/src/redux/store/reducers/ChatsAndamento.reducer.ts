import { IChat } from 'interfaces/IChat'
import { CHATS_ANDAMENTO_ADICIONAR, CHATS_ANDAMENTO_ATUALIZAR_CHAT, CHATS_ANDAMENTO_REMOVER, CHATS_ANDAMENTO_SOCKET_DESCONECTADO } from '../../types/chatsAndamento.types'

const INITIAL_STATE: IChat[] = []

type ChatsAndamentoReduxType =
    | { type: typeof CHATS_ANDAMENTO_ADICIONAR, payload: IChat }
    | { type: typeof CHATS_ANDAMENTO_REMOVER, payload: number }
    | { type: typeof CHATS_ANDAMENTO_ATUALIZAR_CHAT, payload: { idChat: number, data: Partial<IChat> } }
    | { type: typeof CHATS_ANDAMENTO_SOCKET_DESCONECTADO, payload: Partial<IChat> }

export function ChatsAndamentoReducer(state = INITIAL_STATE, action: ChatsAndamentoReduxType) {
    switch (action.type) {

        case CHATS_ANDAMENTO_ADICIONAR:
            return [...state, action.payload]

        case CHATS_ANDAMENTO_REMOVER:
            return state.filter(s => s.id !== action.payload)

        case CHATS_ANDAMENTO_ATUALIZAR_CHAT:
            return state.map(chat =>
                chat.id === action.payload.idChat ?
                    {
                        ...chat,
                        ...action.payload.data
                    }
                    : chat
            )

        case CHATS_ANDAMENTO_SOCKET_DESCONECTADO:
            return state.map(chat =>
                chat.situacao === 2 ?
                    {
                        ...chat,
                        ...action.payload
                    }
                    : chat
            )

        default:
            return state;
    }
};
