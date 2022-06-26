import { combineReducers } from "redux";

import ChatReducer, { IChatReducer } from './Chat.reducer'
import GeralReducer, { IGeralReducer } from './Geral.reducer'

export interface RootState {
    chat: IChatReducer;
    geral: IGeralReducer;
}

const reducer = combineReducers({
    chat: ChatReducer,
    geral: GeralReducer
});

export default reducer