import z from 'zod'
import { passwordValidatorRegex } from '../../regex/password'

export const LoginUserBodyDTO = z.object({
  email: z.email(),
  password: z.string().min(8).regex(passwordValidatorRegex),
})

export const AuthSuccess200ResponseSchema = z
  .object({
    token: z.string(),
  })
  .describe('Token returned upon successful authentication')
  .default({
    token: 'eyJhbGciOi...',
  })

export const AuthError401ResponseSchema = z
  .object({
    message: z.string(),
  })
  .describe('Error message for invalid credentials')
  .default({
    message: 'Invalid email or password',
  })
