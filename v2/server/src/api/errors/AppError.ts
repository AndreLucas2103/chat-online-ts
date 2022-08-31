export class AppError {
    public readonly mensagem: string;

    public readonly statusCode: number;

    public readonly detalhe: string;

    public readonly codigoPermissao: string | undefined;

    constructor(mensagem: string, statusCode = 500, codigoPermissao = '', detalhe = '') {
        this.mensagem = mensagem;
        this.statusCode = statusCode;
        this.codigoPermissao = codigoPermissao || undefined;
        this.detalhe = detalhe;
    }
}
