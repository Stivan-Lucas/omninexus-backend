import { z } from 'zod'

export const GlobalError429ResponseSchema = z
  .object({
    statusCode: z.literal(429),
    error: z.string(),
    message: z.string(),
  })
  .describe('Response returned when the request limit is exceeded')
  .default({
    statusCode: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the request limit. Please try again later.',
  })

export const GlobalError400ResponseSchema = z
  .object({
    statusCode: z.literal(400),
    error: z.string(),
    message: z.string(),
  })
  .describe('Validation error response schema for invalid request body')
  .default({
    statusCode: 400,
    error: 'Bad Request',
    message: 'Invalid request body',
  })
