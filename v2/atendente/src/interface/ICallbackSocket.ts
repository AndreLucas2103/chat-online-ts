export interface ICallbackSocket<T> {
    data: T,
    erro?: {
        codigo: string,
        mensagem: string
        detalhe?: string
    }
}