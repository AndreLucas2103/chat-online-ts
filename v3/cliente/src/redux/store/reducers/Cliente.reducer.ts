import { Action, AnyAction } from "redux";
import { SET_CLIENTE } from "../../types/clienteTypes";

interface IClienteRedux {
    id: number;
    nome: string;
    foto: string;
    email: string;
}

interface IClienteStateReducer {
    cliente: IClienteRedux | null;
}

const INITIAL_STATE: IClienteStateReducer = {
    cliente: null
};

type ClienteReduxActionType =
    | { type: typeof SET_CLIENTE, payload: IClienteRedux }

export function ClienteReducer(state = INITIAL_STATE, action: ClienteReduxActionType) {
    switch (action.type) {
        case SET_CLIENTE:
            return { ...state, cliente: action.payload };

        default:
            return state;
    }
};