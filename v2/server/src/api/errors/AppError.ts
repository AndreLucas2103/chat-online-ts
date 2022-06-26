export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    public readonly detalhe: string;

    constructor(message: string, statusCode = 400, detalhe = "") {
        this.message = message;
        this.statusCode = statusCode;
        this.detalhe = detalhe;
    }
}
