export class CallbackError {
    public readonly erro: {
        mensagem: string;
        codigo: string;
        detalhe: string;
    };

    constructor(mensagem = '', codigo = '500', detalhe = '') {
        this.erro = {
            mensagem,
            codigo,
            detalhe,
        };
    }
}
