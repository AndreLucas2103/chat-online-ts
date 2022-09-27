import { IChat } from "interfaces/IChat";
import { CHATS_ANDAMENTO_ADICIONAR, CHATS_ANDAMENTO_ATUALIZAR_CHAT, CHATS_ANDAMENTO_REMOVER, CHATS_ANDAMENTO_SOCKET_DESCONECTADO } from "redux/types/chatsAndamento.types";

export function chatsAndamentoAdicionar(chat: IChat) {
    return {
        type: CHATS_ANDAMENTO_ADICIONAR,
        payload: chat,
    };
}

export function chatsAndamentoRemover(idChat: number) {
    return {
        type: CHATS_ANDAMENTO_REMOVER,
        payload: idChat,
    };
}

export function chatsAndamentoAtualizarChat(idChat: number, data: Partial<IChat>) {
    return {
        type: CHATS_ANDAMENTO_ATUALIZAR_CHAT,
        payload: {
            idChat,
            data
        },
    };
}

export function chatsAndamentoSocketDesconectado() { // se ocorrer do socket desconectar, todos os chats são encerrados
    return {
        type: CHATS_ANDAMENTO_SOCKET_DESCONECTADO,
        payload: {
            situacao: 3
        }
    }
}