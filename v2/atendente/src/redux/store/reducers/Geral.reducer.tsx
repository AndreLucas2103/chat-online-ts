import { SET_LOADING } from "../../types/geralTypes";

export interface IGeralReducer {
    loading: boolean;
}

const INITIAL_STATE: IGeralReducer = {
    loading: false
};

export default function UsuarioReducer(state= INITIAL_STATE , action: { payload: IGeralReducer, type: string}) {
    switch (action.type) {
        
        case SET_LOADING:
            return { ...state, loading: action.payload.loading };
            
        default:
            return state;
    }
};