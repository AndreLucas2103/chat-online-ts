import { combineReducers } from "redux";

import { UsuarioReducer } from './Usuario.reducer'
import { GeralReducer } from './Geral.reducer'
import { ChatReducer } from "./Chat.reducer";

const reducer = combineReducers({
    usuario: UsuarioReducer,
    geral: GeralReducer,
    chat: ChatReducer,
});

export default reducer