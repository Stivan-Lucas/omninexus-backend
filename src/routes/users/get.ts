import { z } from 'zod'
import { ErrorResponse429Schema } from '../../dtos/errors'
import { UserService } from '../../modules/users/users.service'
import { API_TAGS } from '../../types/docs'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function getUserProfileRoute(app: FastifyTypedInstance) {
  app.get(
    '/me',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: [API_TAGS.USERS?.name ?? 'Users'],
        summary: 'Obter dados do usuário logado',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            id: z.uuid(),
            name: z.string(),
            email: z.email(),
            role: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          429: ErrorResponse429Schema,
        },
      },
    },
    async (request, reply) => {
      const user = await UserService.findByEmail(request.user.email)

      if (!user) {
        return reply.status(404).send({ message: 'User not found' })
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
