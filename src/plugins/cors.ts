import fastifyCors from '@fastify/cors'
import fp from 'fastify-plugin'
import { env } from '../env/env'
import type { FastifyTypedInstance } from '../types/fastify'

export const corsPlugin = fp(async (app: FastifyTypedInstance) => {
  await app.register(fastifyCors, {
    origin: env.CORS_ORIGIN,
    methods: env.CORS_METHODS,
    allowedHeaders: env.CORS_ALLOWED_HEADERS,
  })
})
