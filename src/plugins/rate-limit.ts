import rateLimit from '@fastify/rate-limit'
import type { FastifyRequest } from 'fastify/types/request'
import fp from 'fastify-plugin'
import { env } from '../env/env'
import type { FastifyTypedInstance } from '../types/fastify'

export const rateLimitPlugin = fp(async (app: FastifyTypedInstance) => {
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
    errorResponseBuilder: (request, context) => {
      return {
        statusCode: 429,
        error: 'Too Many Requests',
        skip: (request: FastifyRequest) => {
          const url = request.raw.url ?? ''
          return env.RATE_LIMIT_SKIP_PATHS.some((path) => url.startsWith(path))
        },
        message: request.t('errors.rate_limit_exceeded', {
          limit: context.max,
          window: context.after,
        }),
      }
    },
  })
})
