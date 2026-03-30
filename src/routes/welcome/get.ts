import z from 'zod'
import { ErrorResponse429Schema } from '../../dtos/errors'
import { API_TAGS } from '../../types/docs'
import type { FastifyTypedInstance } from '../../types/fastify'

const get200Schema = z
  .object({
    statusCode: z.literal(200),
    message: z.string(),
  })
  .describe('Resposta padrão')

export async function getWelcomeRoute(app: FastifyTypedInstance) {
  app.get(
    '/',
    {
      schema: {
        tags: [API_TAGS.WELCOME.name],
        summary: 'Teste API',
        description: 'Endpoints para testar se backend está respondendo!',
        response: {
          200: get200Schema,
          429: ErrorResponse429Schema,
        },
      },
    },
    async (req, res) => {
      const message = req.t('welcome')
      return res.status(200).send({
        statusCode: 200,
        message,
      })
    },
  )
}
