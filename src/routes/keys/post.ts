import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import { agentKeys } from '../../database'
import { db } from '../../database/db'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function createKeyRoute(app: FastifyTypedInstance) {
  app.post(
    '/keys',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Keys'],
        summary: 'Generate new agent keys for a user',
        body: z.object({
          quantity: z.number().min(1).max(100),
        }),
      },
    },
    async (request, reply) => {
      const { quantity } = request.body

      const userId = request.user.id
      const name = request.user.name

      const newKeys = Array.from({ length: quantity }).map(() => ({
        userId,
        key: `OMNI-${randomBytes(4).toString('hex').toUpperCase()}-${randomBytes(4).toString('hex').toUpperCase()}`,
      }))

      await db.insert(agentKeys).values(newKeys)
      return reply
        .status(201)
        .send({ message: request.t('keys.created', { quantity, name }) })
    },
  )
}
