import { combineReducers } from "redux";
import { ChatReducer } from "./Chat.reducer";

import { ClienteReducer } from './Cliente.reducer'
import { GeralReducer } from './Geral.reducer'

const reducer = combineReducers({
    cliente: ClienteReducer,
    geral: GeralReducer,
    chat: ChatReducer,
});

export default reducer