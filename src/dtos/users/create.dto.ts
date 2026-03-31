import z from 'zod'
import { passwordValidatorRegex } from '../../regex/password'

export const CreateUserBodyDTO = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8).regex(passwordValidatorRegex),
})

export const UserPostSuccess201ResponseSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
  })
  .describe('User created successfully')
  .default({
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'user@example.com',
  })

export const UserPostError409ResponseSchema = z
  .object({
    message: z.string(),
  })
  .describe('Conflict error when user already exists')
  .default({
    message: 'User already exists',
  })

export const UserPostError500ResponseSchema = z
  .object({
    message: z.string(),
  })
  .describe('Internal server error when user creation fails')
  .default({
    message: 'Failed to create user',
  })
