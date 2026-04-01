import type { FastifyTypedInstance } from '../../types/fastify'
import { resetKeyRoute } from './patch-reset'
import { createKeyRoute } from './post'
import { validateKeyRoute } from './post-validate'

export async function agentKeysRoutes(app: FastifyTypedInstance) {
  await app.register(createKeyRoute)
  await app.register(resetKeyRoute)
  await app.register(validateKeyRoute)
}
