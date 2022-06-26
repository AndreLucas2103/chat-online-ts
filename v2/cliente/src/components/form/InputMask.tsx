import { InputHTMLAttributes } from "react";
import { regexCEP, regexCNPJ, regexCPF, regexData, regexTelefone } from "../text/formatoRegex";

export const InputTelefone = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexTelefone(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputCPF = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexCPF(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputCEP = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexCEP(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputData = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexData(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputCNPJ = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexCNPJ(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}
