import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import fp from 'fastify-plugin'
import packageJson from '../../package.json'

export const docsPlugin = fp(async (app) => {
  // 1. Registro do Swagger (Gera o JSON da especificação)
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        license: {
          name: packageJson.licenses[0]?.type ?? 'None',
          identifier: packageJson.licenses[0]?.type,
          url: packageJson.licenses[0]?.url,
        },
      },
    },
  })

  // 2. Registro do Scalar (Interface visual)
  await app.register(scalarApiReference, {
    routePrefix: '/docs',
    logLevel: 'silent',
    configuration: {
      theme: 'purple',
    },
  })
})
