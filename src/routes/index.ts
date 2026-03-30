import type { FastifyTypedInstance } from '../types/fastify'
import { userRoutes } from './users'
import { welcomeRoutes } from './welcome'

export async function registerRoutes(app: FastifyTypedInstance) {
  await app.register(welcomeRoutes)
  await app.register(userRoutes)
}
