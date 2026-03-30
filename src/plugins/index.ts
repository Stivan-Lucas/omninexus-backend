import type { FastifyTypedInstance } from '../types/fastify'
import { authPlugin } from './auth'
import { corsPlugin } from './cors'
import { docsPlugin } from './docs'
import { i18nPlugin } from './i18nt'
import { rateLimitPlugin } from './rate-limit'

export async function registerPlugins(app: FastifyTypedInstance) {
  await app.register(authPlugin)
  await app.register(corsPlugin)
  await app.register(i18nPlugin)
  await app.register(rateLimitPlugin)
  await app.register(docsPlugin)
}
