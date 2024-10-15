import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('E-mail invalido'),
  password: z.string().min(6).max(14),
  name: z.string().min(4).max(25),
});

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});


export const getUserSchema = z.object({
  id: z.string()
})