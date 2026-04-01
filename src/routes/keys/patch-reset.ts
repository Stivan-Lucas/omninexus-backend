import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { agentKeys } from '../../database'
import { db } from '../../database/db'
import type { FastifyTypedInstance } from '../../types/fastify'

const ResetKeyParamsSchema = z.object({
  id: z.uuid(),
})

export async function resetKeyRoute(app: FastifyTypedInstance) {
  app.patch(
    '/keys/:id/reset',
    {
      onRequest: [app.authenticate],
      schema: {
        tags: ['Keys'],
        summary: 'Reset Hardware ID for a key (allow reuse)',
        params: ResetKeyParamsSchema,
      },
    },
    async (request) => {
      const { id } = request.params

      await db
        .update(agentKeys)
        .set({ hardwareId: null, activatedAt: null })
        .where(eq(agentKeys.id, id))

      return { message: request.t('keys.resetSuccess') }
    },
  )
}
