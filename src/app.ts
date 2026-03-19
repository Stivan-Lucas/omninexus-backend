import fastifyCors from '@fastify/cors'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env/env'
import { docsPlugin } from './plugins/docs'
import { getLoggerOptions } from './utils/logger'

export const app = Fastify({
  logger: getLoggerOptions(),
  genReqId: () => crypto.randomUUID(),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: env.CORS_ORIGIN,
  methods: env.CORS_METHODS,
  allowedHeaders: env.CORS_ALLOWED_HEADERS,
})

await app.register(docsPlugin)

app.get('/', async (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Hello World',
  })
})
