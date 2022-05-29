import { SET_LOADING } from "../../types/geralTypes";

export function setLoading(status: boolean ) {
	return {
		type: SET_LOADING,
		payload: {
			loading: status
		} ,
	}; 
}