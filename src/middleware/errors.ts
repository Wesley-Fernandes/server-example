import { NextFunction, Request, Response } from 'express';
import { ApiError } from './api-errors';
import { ZodError } from 'zod';

export const errors = (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const formattedErrors: Record<string, string[]> = {};

    err.errors.forEach((error) => {
      const path = error.path.join('.');
      if (!formattedErrors[path]) {
        formattedErrors[path] = [];
      }
      formattedErrors[path].push(error.message);
    });

    res.status(400).json({
      message: 'Erro de tipos.',
      erros: formattedErrors,
    });
  }
  const statusCode = err.statusCode ?? 500;

  switch (statusCode) {
    case 200:
      res.status(200).json({ message: 'Operação bem-sucedida.' });
      break;

    case 201:
      res.status(201).json({ message: 'Recurso criado com sucesso.' });
      break;

    case 204:
      res.status(204).send();
      break;

    case 302:
      res.status(302).json({ message: 'Redirecionado para outro recurso.' });
      break;

    case 400:
      res.status(400).json({ message: err.message });
      break;

    case 401:
      res.status(401).json({ message: 'Você não têm autorização.' });
      break;

    case 403:
      res.status(403).json({ message: 'Acesso proibido.' });
      break;

    case 404:
      res.status(404).json({ message: 'Recurso não encontrado.' });
      break;

    case 409:
      res.status(409).json({ message: 'Conflito na requisição.' });
      break;

    case 500:
    default:
      console.log(err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
      break;
  }
};
