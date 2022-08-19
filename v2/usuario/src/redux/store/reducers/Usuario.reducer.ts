import { SET_USUARIO } from "../../types/usuarioTypes";

interface IUsuarioRedux {
    usuario: {
        id: number,
        primeiroNome: string,
        nomeCompleto: string,
        email: string,
        foto: string,
        administrador: 1 | 0,
        situacao: 1 | 2, // 1-ativo, 2-inativo
        statusChat: 1 | 2 | 3, // 1-online, 2-ausente, 3-offline
        socketId: string,
    } | null
} 

const INITIAL_STATE: IUsuarioRedux = {
    usuario: null
};

export function UsuarioReducer(state = INITIAL_STATE, action: { payload: IUsuarioRedux, type: string }) {
    switch (action.type) {

        case SET_USUARIO:
            return { ...state, usuario: action.payload.usuario };

        default:
            return state;
    }
};