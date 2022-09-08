import { SET_ACESSO_RESTRITO, SET_LOADING } from "../../types/geralTypes";

export function setLoading(status: boolean ) {
	return {
		type: SET_LOADING,
		payload: {
			loading: status
		},
	}; 
}

export function setAcessoRestrito(acessoRestrito: { aberto: boolean, codigoPermissao: string }) {
	return {
		type: SET_ACESSO_RESTRITO,
		payload: {
			acessoRestrito: acessoRestrito
		},
	};
}