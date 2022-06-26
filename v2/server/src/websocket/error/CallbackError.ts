export class CallbackError {
    public readonly mensagem: string | undefined;

    public readonly codigo: string;

    public readonly detalhe: string;

    constructor(mensagem = "", codigo = "500", detalhe = "") {
        this.mensagem = mensagem;
        this.codigo = codigo;
        this.detalhe = detalhe;
    }
}
