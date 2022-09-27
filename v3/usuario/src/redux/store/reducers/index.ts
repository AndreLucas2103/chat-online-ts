import { combineReducers } from "redux";

import { UsuarioReducer } from './Usuario.reducer'
import { GeralReducer } from './Geral.reducer'
import { ChatsAguardandoReducer } from "./ChatsAguardando.reducer";
import { ChatsAndamentoReducer } from "./ChatsAndamento.reducer";
import { ChatsRecusadoReducer } from "./ChatsRecusado.reducer";

const reducer = combineReducers({
    usuario: UsuarioReducer,
    geral: GeralReducer,
    chatsAguardando: ChatsAguardandoReducer,
    chatsAndamento: ChatsAndamentoReducer,
    chatsRecusados: ChatsRecusadoReducer
});

export default reducer