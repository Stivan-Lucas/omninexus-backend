import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { corsPlugin } from './plugins/cors'
import { docsPlugin } from './plugins/docs'
import { i18nPlugin } from './plugins/i18nt'
import { getLoggerOptions } from './utils/logger'

export const app = Fastify({
  logger: getLoggerOptions(),
  genReqId: () => crypto.randomUUID(),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await app.register(corsPlugin)
await app.register(docsPlugin)
await app.register(i18nPlugin)

app.get('/', async (req, res) => {
  const translatedMessage = req.t('welcome')

  return res.status(200).send({
    status: 200,
    message: translatedMessage,
  })
})
