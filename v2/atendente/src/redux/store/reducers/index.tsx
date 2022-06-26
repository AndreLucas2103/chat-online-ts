import { combineReducers } from "redux";

import UsuarioReducer, { IUsuarioReducer } from './Usuario.reducer'
import GeralReducer, { IGeralReducer } from './Geral.reducer'

export interface RootState {
    usuario: IUsuarioReducer;
    geral: IGeralReducer;
}

const reducer = combineReducers({
    usuario: UsuarioReducer,
    geral: GeralReducer
});

export default reducer