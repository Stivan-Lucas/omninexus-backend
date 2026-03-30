import type { FastifyTypedInstance } from '../../types/fastify'
import { getUserProfileRoute } from './get'
import { loginRoute } from './login'
import { createUserRoute } from './post'

export async function userRoutes(app: FastifyTypedInstance) {
  await app.register(createUserRoute)
  await app.register(getUserProfileRoute)
  await app.register(loginRoute)
}
