import { RootState } from "..";
import { SET_CLIENTE } from "../../types/clienteTypes";

export function setCliente(cliente: RootState["cliente"]["cliente"]) {
	return {
		type: SET_CLIENTE,
		payload: cliente,
	};
}
