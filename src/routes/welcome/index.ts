import type { FastifyTypedInstance } from '../../types/fastify'
import { getWelcomeRoute } from './get'

export async function welcomeRoutes(app: FastifyTypedInstance) {
  await app.register(getWelcomeRoute)
}
