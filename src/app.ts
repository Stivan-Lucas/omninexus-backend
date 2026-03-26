import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { corsPlugin } from './plugins/cors'
import { docsPlugin } from './plugins/docs'
import { getLoggerOptions } from './utils/logger'

export const app = Fastify({
  logger: getLoggerOptions(),
  genReqId: () => crypto.randomUUID(),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await app.register(corsPlugin)
await app.register(docsPlugin)

app.get('/', async (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Hello World',
  })
})
