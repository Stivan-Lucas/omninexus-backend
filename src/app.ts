import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { registerPlugins } from './plugins'
import { registerRoutes } from './routes'
import { getLoggerOptions } from './utils/logger'

export const app = Fastify({
  logger: getLoggerOptions(),
  genReqId: () => crypto.randomUUID(),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await registerPlugins(app)
await registerRoutes(app)
