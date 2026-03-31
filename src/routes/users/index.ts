import type { FastifyTypedInstance } from '../../types/fastify'
import { getUserProfileRoute } from './get'
import { createUserRoute } from './post'

export async function userRoutes(app: FastifyTypedInstance) {
  await app.register(createUserRoute)
  await app.register(getUserProfileRoute)
}
