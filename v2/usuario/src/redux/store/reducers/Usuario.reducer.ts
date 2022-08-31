import { Action, AnyAction } from "redux";
import { SET_USUARIO, SET_USUARIO_STATUS } from "../../types/usuarioTypes";

interface IUsuarioRedux {
    usuario: {
        _id: string,
        primeiroNome: string,
        nomeCompleto: string,
        email: string,
        foto: string,
        administrador: boolean,
        situacao: 1 | 2, // 1-ativo, 2-inativo
        statusChat: 1 | 2 | 3, // 1-online, 2-ausente, 3-offline
        socketId: string,
    } | null
}

const INITIAL_STATE: IUsuarioRedux = {
    usuario: null
};
type UsuarioReduxActionType =
    | { type: typeof SET_USUARIO, payload: IUsuarioRedux }
    | { type: typeof SET_USUARIO_STATUS, payload: 1 | 2 | 3 }

export function UsuarioReducer(state = INITIAL_STATE, action: UsuarioReduxActionType) {
    switch (action.type) {
        case SET_USUARIO:
            return { ...state, usuario: action.payload.usuario };

        case SET_USUARIO_STATUS:
            if (state.usuario) {
                return { ...state, usuario: { ...state.usuario, statusChat: action.payload } };
            }
            return state;

        default:
            return state;
    }
};