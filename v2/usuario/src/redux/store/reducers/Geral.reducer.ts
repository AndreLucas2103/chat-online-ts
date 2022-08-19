import { SET_LOADING, SET_ACESSO_RESTRITO } from "../../types/geralTypes";

export interface IGeralReducer {
    loading: boolean;
    acessoRestrito: {
        aberto: boolean,
        codigoPermissao: string
    }
}

const INITIAL_STATE: IGeralReducer = {
    loading: false,
    acessoRestrito: {
        codigoPermissao: "",
        aberto: false
    }
};

export function GeralReducer(state = INITIAL_STATE, action: { payload: IGeralReducer, type: string }) {
    switch (action.type) {

        case SET_LOADING:
            return { ...state, loading: action.payload.loading };

        case SET_ACESSO_RESTRITO:
            return { ...state, acessoRestrito: action.payload.acessoRestrito };

        default:
            return state;
    }
};