import { User } from './models/User'; // Importe o tipo do usuário (dependendo de como você estrutura seu projeto)

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}
