import { API_TAGS } from '../../config/tags'
import { GlobalError429ResponseSchema } from '../../dtos/globals/errors'
import {
  UserGetError401ResponseSchema,
  UserGetError404ResponseSchema,
  UserGetSuccess200ResponseSchema,
} from '../../dtos/users'
import { UserService } from '../../modules/users/users.service'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function getUserProfileRoute(app: FastifyTypedInstance) {
  app.get(
    '/me',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: [API_TAGS.USERS?.name],
        description: API_TAGS.USERS.description,
        summary: 'Get the profile of the authenticated user',
        security: [{ bearerAuth: [] }],
        response: {
          200: UserGetSuccess200ResponseSchema,
          401: UserGetError401ResponseSchema,
          404: UserGetError404ResponseSchema,
          429: GlobalError429ResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await UserService.findByEmail(request.user.email)

      if (!user) {
        return reply
          .status(404)
          .send({ message: request.t('users.get.notFound') })
      }

      return reply.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    },
  )
}
