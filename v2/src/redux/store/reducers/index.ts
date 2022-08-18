import { combineReducers } from "redux";

import UsuarioReducer, { IUsuarioReducer } from './Usuario.reducer'
import GeralReducer, { IGeralReducer } from './Geral.reducer'
import UnidadeReducer, { IUnidadeReducer } from "./Unidade.reducer";

export interface RootState {
    usuario: IUsuarioReducer;
    geral: IGeralReducer;
    unidade: IUnidadeReducer;
}

const reducer = combineReducers({
    usuario: UsuarioReducer,
    geral: GeralReducer,
    unidade: UnidadeReducer,
});

export default reducer