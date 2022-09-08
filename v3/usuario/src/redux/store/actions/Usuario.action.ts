import { RootState } from "..";
import { SET_USUARIO, SET_USUARIO_STATUS } from "../../types/usuarioTypes";

export function setUsuario(usuario: RootState["usuario"]['usuario']) {
	return {
		type: SET_USUARIO,
		payload: { usuario },
	};
}

export function setUsuarioStatus(status: 1 | 2 | 3) {
	return {
		type: SET_USUARIO_STATUS,
		payload: status,
	};
}