import * as jwt from 'jsonwebtoken'

export function jwtGenerateToken(params = {}) {
    return jwt.sign(params, 'webchat', {});
}

export function jwtVerify(token: string) {
    return jwt.verify(token, 'webchat', (err: any, decoded: any) => { // verifica se o token é valido
        if (err) return { erro: true, detalhe: "Ocorreu erro na validação" }

        if (Date.now() > decoded.exp * 1000) return { erro: true, detalhe: "Token inválido" }

        // exp = expire, in = data criacao, id
        return decoded;
    });

}