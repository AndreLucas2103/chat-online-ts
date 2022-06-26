import { SET_USUARIO } from "../../types/usuarioTypes";

export interface IUsuarioRedux {
    _id?: string
    email?: string;
    socketId?: string;
    foto?: string;
    nome?: string;
    status?: string;
}

export interface IUsuarioReducer {
    usuario: IUsuarioRedux
}

const INITIAL_STATE: IUsuarioReducer = {
    usuario: {
        _id: undefined,
        email: undefined,
        socketId: undefined,
        foto: undefined,
        nome: undefined,
        status: undefined,
    }
};

export default function UsuarioReducer(state = INITIAL_STATE, action: { payload: IUsuarioReducer, type: string }) {
    switch (action.type) {

        case SET_USUARIO:
            return { ...state, usuario: action.payload.usuario };

        default:
            return state;
    }
};