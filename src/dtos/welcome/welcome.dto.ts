import z from 'zod'

export const WelcomeSuccess200ResponseSchema = z
  .object({
    statusCode: z.literal(200),
    message: z.string(),
  })
  .describe('Default welcome response')
  .default({
    statusCode: 200,
    message: 'Welcome to the API!',
  })
