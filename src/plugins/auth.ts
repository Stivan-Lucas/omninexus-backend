import fastifyJwt from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { env } from '../env/env'
import type { FastifyTypedInstance } from '../types/fastify'

export const authPlugin = fp(async (app: FastifyTypedInstance) => {
  // Configuração do JWT
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  })

  // Decorator para ser usado em hooks de rotas protegidas
  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    },
  )
})
