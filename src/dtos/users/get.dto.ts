import z from 'zod'

export const UserGetSuccess200ResponseSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    role: z.string(),
  })
  .describe('Successful response for getting user profile')
  .default({
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
  })

export const UserGetError401ResponseSchema = z
  .object({
    error: z.string(),
    message: z.string(),
  })
  .describe('Error response for unauthorized access to user profile')
  .default({
    error: 'Unauthorized',
    message: 'Unauthorized',
  })

export const UserGetError404ResponseSchema = z
  .object({
    message: z.string(),
  })
  .describe('Error response for when user is not found')
  .default({
    message: 'User not found',
  })
