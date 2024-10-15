import { Request, Response } from 'express';
import { registerSchema, signInSchema } from '../types/auth';
import Repository from '../repository';
import Criptografy from '../util/criptografy';
import JWT from 'jsonwebtoken';
import env from '../configuration/env';
import ERRORS from '../middleware/throws';
import { json } from 'stream/consumers';

export class AuthController {
  private db: Repository;

  constructor(repo: Repository) {
    this.db = repo;
  }

  /**
   * Registra um novo usuário no sistema.
   *
   * @param req O objeto de requisição contendo as credenciais do usuário.
   * @param res O objeto de resposta para enviar a resposta ao cliente.
   */
  async register(req: Request, res: Response) {
    const { email, password, name } = registerSchema.parse(req.body);

    // Verifica se o e-mail já está registrado
    const exist = await this.db.auth.find(email);
    if (exist) {
      return res
        .status(400)
        .json({ message: 'Você já tem uma conta com este e-mail.' });
    }

    // Criptografa a senha antes de armazená-la
    const hashed = await Criptografy.encryptPassword(password);

    // Registra o novo usuário no banco de dados
    await this.db.auth.register(email, hashed, name);

    return res.status(201).json({ message: 'Conta criada com sucesso!' });
  }

  /**
   * Realiza o login do usuário, gerando um token JWT para autenticação e enviando-o via cookie.
   *
   * @param req O objeto de requisição contendo as credenciais do usuário.
   * @param res O objeto de resposta para enviar a resposta ao cliente.
   */
  async signIn(req: Request, res: Response) {
    const { email, password } = signInSchema.parse(req.body);
    const user = await this.db.auth.find(email);

    if (!user) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos.' });
    }

    const isPasswordValid = await Criptografy.comparePasswords(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ERRORS.Unauthorized('Dados não conferem.');
    }

    const token = JWT.sign({ userId: user.id }, env.JWT, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Login bem-sucedido.' });
  }

  /**
   * Realiza o logout do usuário, invalidando o token (removendo o cookie).
   *
   * @param req O objeto de requisição.
   * @param res O objeto de resposta para enviar a resposta ao cliente.
   */
  async signOut(req: Request, res: Response) {
    const user = req.user?.userId;
    console.log({ user });
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Você saiu com sucesso.' });
  }

  async get(req: Request, res: Response){
    const user = req.user?.userId!
    const data = await this.db.auth.get(user);
    const {password, ...userData} = data!;
    return res.status(200).json({message: userData})
  }
}
