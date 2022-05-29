import { SET_USUARIO } from "../../types/usuarioTypes";

import { IUsuario } from '../reducers/Usuario.reducer'

export function setUsuario(usuario: IUsuario ) {
	return {
		type: SET_USUARIO,
		payload: { usuario },
	};
}