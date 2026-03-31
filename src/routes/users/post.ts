import { API_TAGS } from '../../config/tags'
import {
  GlobalError400ResponseSchema,
  GlobalError429ResponseSchema,
} from '../../dtos/globals/errors'
import {
  CreateUserBodyDTO,
  UserPostError409ResponseSchema,
  UserPostError500ResponseSchema,
  UserPostSuccess201ResponseSchema,
} from '../../dtos/users'
import { UserService } from '../../modules/users/users.service'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function createUserRoute(app: FastifyTypedInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: [API_TAGS.USERS.name],
        description: API_TAGS.USERS.description,
        summary: 'Create a new user',
        body: CreateUserBodyDTO,
        response: {
          201: UserPostSuccess201ResponseSchema,
          400: GlobalError400ResponseSchema,
          409: UserPostError409ResponseSchema,
          429: GlobalError429ResponseSchema,
          500: UserPostError500ResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userExists = await UserService.findByEmail(email)
      if (userExists) {
        const message = request.t('users.errors.userExists')
        return reply.status(409).send({ message })
      }

      const [createdUser] = await UserService.createMaster({
        name,
        email,
        password,
      })

      if (!createdUser) {
        const message = request.t('users.errors.creationFailed')
        return reply.status(500).send({ message })
      }

      return reply.status(201).send(createdUser)
    },
  )
}
