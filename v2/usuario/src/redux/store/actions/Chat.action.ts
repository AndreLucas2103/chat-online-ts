import { RootState } from "..";
import { SET_CHATS_ANDAMENTO, SET_CHATS_FILA_ESPERA, SET_CHATS_RECUSADOS } from "../../types/chatTypes";

export function setChatsFilaEspera(chats: RootState['chat']['chatsAndamento'] ) {
	return {
		type: SET_CHATS_FILA_ESPERA,
		payload: chats,
	}; 
}

export function setChatsAndamento(chats: RootState['chat']['chatsAndamento'] ) {
    return {
        type: SET_CHATS_ANDAMENTO,
        payload: chats,
    }; 
}

export function setChatsRecusados(chats: RootState['chat']['chatsRecusados'] ) {
    return {
        type: SET_CHATS_RECUSADOS,
        payload: chats,
    }; 
}