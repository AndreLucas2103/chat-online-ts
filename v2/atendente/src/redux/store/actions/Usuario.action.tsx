import { SET_USUARIO } from "../../types/usuarioTypes";

import { IUsuarioRedux } from '../reducers/Usuario.reducer'

export function setUsuario(usuario: IUsuarioRedux ) {
	return {
		type: SET_USUARIO,
		payload: { usuario },
	};
}