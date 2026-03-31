import type { FastifyTypedInstance } from '../../types/fastify'
import { loginRoute } from './login'

export async function authRoutes(app: FastifyTypedInstance) {
  await app.register(loginRoute)
}
