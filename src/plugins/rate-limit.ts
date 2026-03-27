import rateLimit from '@fastify/rate-limit'
import fp from 'fastify-plugin'
import type { FastifyTypedInstance } from '../types/fastify'

export const rateLimitPlugin = fp(async (app: FastifyTypedInstance) => {
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: (request, context) => {
      return {
        statusCode: 429,
        error: 'Too Many Requests',
        message: request.t('errors.rate_limit_exceeded', {
          limit: context.max,
          window: context.after,
        }),
      }
    },
  })
})
