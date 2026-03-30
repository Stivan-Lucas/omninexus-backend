import { z } from 'zod'
import { ErrorResponse429Schema } from '../../dtos/errors'
import { UserService } from '../../modules/users/users.service'
import { API_TAGS } from '../../types/docs'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function createUserRoute(app: FastifyTypedInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: [API_TAGS.USERS.name],
        summary: 'Criar novo administrador',
        body: z.object({
          name: z.string().min(3),
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            id: z.uuid(),
            email: z.email(),
          }),
          409: z.object({
            message: z.string(),
          }),
          429: ErrorResponse429Schema,
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userExists = await UserService.findByEmail(email)
      if (userExists) {
        return reply.status(409).send({ message: 'User already exists' })
      }

      const [createdUser] = await UserService.createMaster({
        name,
        email,
        password,
      })

      if (!createdUser) {
        return reply.status(500).send({ message: 'Failed to create user' })
      }

      return reply.status(201).send(createdUser)
    },
  )
}
