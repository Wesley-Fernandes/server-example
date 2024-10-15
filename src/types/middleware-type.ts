import { z } from 'zod';

export const AuthMiddlewareSchema = z.object({
  authorization: z.string(),
});
