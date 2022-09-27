import { IChat } from "interfaces/IChat";
import { CHATS_AGUARDANDO_ADICIONAR, CHATS_AGUARDANDO_REMOVER, CHATS_AGUARDANDO_CRON_SEGUNDOS_FILA, CHATS_AGUARDANDO_REMOVER_TODOS } from "../../types/chatsAguardando.types";

export function chatsAguardandoAdicionar(chat: IChat) {
    return {
        type: CHATS_AGUARDANDO_ADICIONAR,
        payload: chat,
    };
}

export function chatsAguardandoRemover(idChat: number) {
    return {
        type: CHATS_AGUARDANDO_REMOVER,
        payload: idChat,
    };
}

export function chatsAguardandoCronSegundosFila(chats: IChat[]) {
    return {
        type: CHATS_AGUARDANDO_CRON_SEGUNDOS_FILA,
        payload: chats,
    };
}

export function chatsAguardandoRemoverTodos() {
    return {
        type: CHATS_AGUARDANDO_REMOVER_TODOS,
        payload: null,
    };
}

