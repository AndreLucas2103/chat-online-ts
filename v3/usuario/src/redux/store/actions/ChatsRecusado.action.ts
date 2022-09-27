import { IChat } from "interfaces/IChat";
import { CHATS_RECUSADO_ADICIONAR, CHATS_RECUSADO_REMOVER } from "redux/types/chatsRecusado.types";


export function chatsRecusadoAdicionar(chat: IChat) {
    return {
        type: CHATS_RECUSADO_ADICIONAR,
        payload: chat,
    };
}

export function chatsRecusadoRemover(idChat: number) {
    return {
        type: CHATS_RECUSADO_REMOVER,
        payload: idChat,
    };
}
