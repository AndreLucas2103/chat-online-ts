import { RootState } from "..";
import { SET_CHAT } from "../../types/chatTypes";

export function setChat(chat: RootState["chat"]['chat']) {
	return {
		type: SET_CHAT,
		payload: chat,
	};
}
