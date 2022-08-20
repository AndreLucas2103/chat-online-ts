import { RootState } from "..";
import { SET_USUARIO } from "../../types/usuarioTypes";

export function setUsuario(usuario: RootState["usuario"]['usuario']) {
	return {
		type: SET_USUARIO,
		payload: { usuario },
	};
}