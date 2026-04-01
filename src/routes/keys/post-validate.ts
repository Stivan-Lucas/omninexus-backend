import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { agentKeys } from '../../database'
import { db } from '../../database/db'
import type { FastifyTypedInstance } from '../../types/fastify'

// Schema de validação do corpo da requisição
const ValidateKeyBodySchema = z.object({
  key: z.string().min(1),
  hardwareId: z.string().min(1),
})

export async function validateKeyRoute(app: FastifyTypedInstance) {
  app.post(
    '/keys/validate',
    {
      schema: {
        tags: ['Agent'],
        summary: 'Validate key and link hardware ID',
        body: ValidateKeyBodySchema,
        response: {
          200: z.object({
            valid: z.boolean(),
            message: z.string(),
          }),
          401: z.object({ valid: z.boolean(), message: z.string() }),
          403: z.object({ valid: z.boolean(), message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { key, hardwareId } = request.body

      // Busca a chave ativa no banco
      const foundKey = await db.query.agentKeys.findFirst({
        where: and(eq(agentKeys.key, key), eq(agentKeys.isActive, true)),
      })

      // 1. Validação de existência e status
      if (!foundKey) {
        return reply.status(401).send({
          valid: false,
          message: request.t('keys.invalidOrInactive'),
        })
      }

      // 2. Proteção contra Hardware diferente (Anti-pirataria/Compartilhamento)
      if (foundKey.hardwareId && foundKey.hardwareId !== hardwareId) {
        return reply.status(403).send({
          valid: false,
          message: request.t('keys.alreadyLinkedToOther'),
        })
      }

      // 3. Caso o hardware seja o MESMO (Re-validação/Reboot do PC)
      if (foundKey.hardwareId === hardwareId) {
        return reply.status(200).send({
          valid: true,
          message: 'Authorized (Session restored)',
        })
      }

      // 4. Primeira ativação (hardwareId é null no banco)
      // Vincula o ID da máquina e registra a data de ativação
      await db
        .update(agentKeys)
        .set({
          hardwareId,
          activatedAt: new Date(),
        })
        .where(eq(agentKeys.id, foundKey.id))

      return reply.status(200).send({
        valid: true,
        message: 'Authorized and hardware linked',
      })
    },
  )
}
