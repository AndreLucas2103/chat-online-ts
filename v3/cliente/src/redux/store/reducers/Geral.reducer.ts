import { SET_LOADING } from "../../types/geralTypes";

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

        default:
            return state;
    }
};