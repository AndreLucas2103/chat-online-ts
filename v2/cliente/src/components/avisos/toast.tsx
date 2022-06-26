import toast from 'react-hot-toast'

// valida se o err é de response status 403, para requisições post/put/delete onde não useFetch não é aplicado, caso seja 403 ele não retorna nenhum erro a menos que tenha uma mensagem enviada
export const toastError = (mensagem?: string) => {
    if (mensagem) return toast.error(mensagem)

    return toast.error('Ocorreu um erro')
}

export const toastSuccess = (mensagem: string) => {
    return toast.success(mensagem)
}