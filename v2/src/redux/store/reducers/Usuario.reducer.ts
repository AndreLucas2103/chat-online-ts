import { SET_CADASTRO, SET_CADASTRO_E_USUARIO, SET_USUARIO } from "../../types/usuarioTypes";

export interface IUsuarioRedux {
    id?: number,
    idguid?: string,
    administrador?: 1 | 0,
    situacao?: number, // 1-ativo, 2-inativo
}

export interface ICadastroRedux {
    id?: number,
    idguid?: string,
    primeiroNome?: string,
    nomeCompleto?: string,
    email?: string,
    foto?: string,
}

export interface IUsuarioReducer {
    usuario: IUsuarioRedux,
    cadastro: ICadastroRedux,
}

const INITIAL_STATE: IUsuarioReducer = {
    usuario: {
        id: undefined,
        idguid: undefined,
        administrador: undefined,
        situacao: undefined,
    },
    cadastro: {
        id: undefined,
        idguid: undefined,
        primeiroNome: undefined,
        nomeCompleto: undefined,
        email: undefined,
        foto: undefined,
    }
};

export default function UsuarioReducer(state = INITIAL_STATE, action: { payload: IUsuarioReducer, type: string }) {
    switch (action.type) {

        case SET_USUARIO:
            return { ...state, usuario: action.payload.usuario };

        case SET_CADASTRO:
            return { ...state, cadastro: action.payload.cadastro };

        case SET_CADASTRO_E_USUARIO:
            return { ...state, usuario: action.payload.usuario, cadastro: action.payload.cadastro };

        default:
            return state;
    }
};