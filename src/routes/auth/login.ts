import bcrypt from 'bcrypt'
import { API_TAGS } from '../../config/tags'
import {
  AuthError401ResponseSchema,
  AuthSuccess200ResponseSchema,
  LoginUserBodyDTO,
} from '../../dtos/auth'
import {
  GlobalError400ResponseSchema,
  GlobalError429ResponseSchema,
} from '../../dtos/globals/errors'
import { UserService } from '../../modules/users/users.service'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function loginRoute(app: FastifyTypedInstance) {
  app.post(
    '/login',
    {
      schema: {
        tags: [API_TAGS.AUTH.name],
        description: API_TAGS.AUTH.description,
        summary: 'Authenticate a user and return a JWT token',
        body: LoginUserBodyDTO,
        response: {
          200: AuthSuccess200ResponseSchema,
          400: GlobalError400ResponseSchema,
          401: AuthError401ResponseSchema,
          429: GlobalError429ResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const user = await UserService.findByEmail(email)

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        const message = request.t('auth.invalidCredentials')
        return reply.status(401).send({ message })
      }

      const token = app.jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        { expiresIn: '1d', algorithm: 'HS256' },
      )

      return { token }
    },
  )
}
