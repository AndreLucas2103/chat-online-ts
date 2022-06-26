import { SET_CHAT } from "../../types/chatTypes";

import { IChatRedux } from '../reducers/Chat.reducer'

export function setChat(chat: IChatRedux ) {
	return {
		type: SET_CHAT,
		payload: { chat },
	};
}