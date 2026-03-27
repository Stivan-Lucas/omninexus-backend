import { z } from 'zod'

export const ErrorResponse429Schema = z
  .object({
    statusCode: z.literal(429),
    error: z.string(),
    message: z.string(),
  })
  .describe('Resposta retornada quando o limite de requisições é excedido.')

export type ErrorResponse429 = z.infer<typeof ErrorResponse429Schema>
