import { SET_USUARIO } from "../../types/usuarioTypes";

export interface IUsuario {
    _id?: string
    email?: string;
    socket_id?: string;
    avatar?: string;
    name?: string;
}

export interface IUsuarioReducer {
    usuario: IUsuario
}

const INITIAL_STATE: IUsuarioReducer = {
    usuario: {
        _id: undefined,
        email: undefined,
        socket_id: undefined,
        avatar: undefined,
        name: undefined,
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