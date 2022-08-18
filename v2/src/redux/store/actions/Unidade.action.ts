import { SET_UNIDADE } from "../../types/unidadeTypes";
import { IUnidadeRedux } from "../reducers/Unidade.reducer";

export function setUnidade(unidade: IUnidadeRedux) {
    return {
        type: SET_UNIDADE,
        payload: { unidade },
    };
}