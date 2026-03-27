import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { ErrorResponse429Schema } from './dtos/errors'
import { registerPlugins } from './plugins'
import { API_TAGS } from './types/docs'
import { getLoggerOptions } from './utils/logger'

export const app = Fastify({
  logger: getLoggerOptions(),
  genReqId: () => crypto.randomUUID(),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await registerPlugins(app)

const get200Schema = z
  .object({
    statusCode: z.literal(200),
    message: z.string(),
  })
  .describe('Resposta padrão')

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
