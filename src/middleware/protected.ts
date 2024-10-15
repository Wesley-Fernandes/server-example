import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import env from '../configuration/env';

/**
 * Middleware para verificar se o usuário tem um token JWT válido.
 *
 * @param req O objeto de requisição.
 * @param res O objeto de resposta.
 * @param next Função que passa o controle para o próximo middleware ou rota.
 */
export const Protected = (req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next();
    return;
  }

  const token = req.cookies.token;

  if (!token) {
    res
      .status(401)
      .json({ message: 'Token não encontrado. Acesso não autorizado.' });
    return;
  }
  JWT.verify(token, env.JWT, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido ou expirado.' });
      return;
    }

    req.user = decoded as { userId: string };
    next();
    return;
  });
};
