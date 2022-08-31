declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Request {
        user: {
            jwtToken?: string,
            id: string,
            administrador?: boolean,
        }
    }
}
