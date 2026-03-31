import { API_TAGS } from '../../config/tags'
import { GlobalError429ResponseSchema } from '../../dtos/globals/errors'
import { WelcomeSuccess200ResponseSchema } from '../../dtos/welcome/welcome.dto'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function getWelcomeRoute(app: FastifyTypedInstance) {
  app.get(
    '/',
    {
      schema: {
        tags: [API_TAGS.WELCOME.name],
        description: API_TAGS.WELCOME.description,
        summary: 'Test API is online',
        response: {
          200: WelcomeSuccess200ResponseSchema,
          429: GlobalError429ResponseSchema,
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
