import type { FastifyTypedInstance } from '../types/fastify'
import { authRoutes } from './auth'
import { agentKeysRoutes } from './keys'
import { userRoutes } from './users'
import { welcomeRoutes } from './welcome'

export async function registerRoutes(app: FastifyTypedInstance) {
  await app.register(welcomeRoutes)
  await app.register(authRoutes)
  await app.register(userRoutes)
  await app.register(agentKeysRoutes)
}
