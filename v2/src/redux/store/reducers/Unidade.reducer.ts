import { SET_UNIDADE } from "../../types/unidadeTypes";

export interface IUnidadeRedux {
    id?: number,
    idguid?: string,
    nomeFantasia?: string,
    situacao?: number,
    timezone?: string,
}

export interface IUnidadeReducer {
    unidade: IUnidadeRedux
}

const INITIAL_STATE: IUnidadeReducer = {
    unidade: {
        id: undefined,
        idguid: undefined,
        nomeFantasia: undefined,
        situacao: undefined,
        timezone: undefined,
    }
};

export default function UnidadeReducer(state = INITIAL_STATE, action: { payload: IUnidadeReducer, type: string }) {
    switch (action.type) {

        case SET_UNIDADE:
            return { ...state, unidade: action.payload.unidade };

        default:
            return state;
    }
};