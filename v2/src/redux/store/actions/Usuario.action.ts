import { SET_CADASTRO, SET_CADASTRO_E_USUARIO, SET_USUARIO } from "../../types/usuarioTypes";

import { ICadastroRedux, IUsuarioRedux } from '../reducers/Usuario.reducer'

export function setUsuario(usuario: IUsuarioRedux) {
	return {
		type: SET_USUARIO,
		payload: { usuario },
	};
}

export const setCadastro = (cadastro: ICadastroRedux) => {
	return {
		type: SET_CADASTRO,
		payload: { cadastro },
	};
}

export const setCadastroEUsuario = (dados: { cadastro: ICadastroRedux, usuario: IUsuarioRedux }) => {
	return {
		type: SET_CADASTRO_E_USUARIO,
		payload: dados,
	}
}