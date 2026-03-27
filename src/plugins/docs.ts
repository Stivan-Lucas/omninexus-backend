import fastifyBasicAuth from '@fastify/basic-auth'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import packageJson from '../../package.json'
import { env } from '../env/env'
import type { FastifyTypedInstance } from '../types/fastify'

export const docsPlugin = fp(async (app: FastifyTypedInstance) => {
  // Proteção básica para rota de documentação
  await app.register(fastifyBasicAuth, {
    validate: async (user, pass) => {
      if (user !== env.SWAGGER_USER || pass !== env.SWAGGER_PASS) {
        return new Error('Unauthorized')
      }
    },
    authenticate: { realm: 'docs' },
  })

  // Registro de swagger
  await app.register(fastifySwagger, {
    transform: jsonSchemaTransform,
    openapi: {
      info: {
        title: packageJson.displayName,
        version: packageJson.version,
        description: packageJson.description,
        termsOfService: 'https://www.omninexus.com.br/terms',
        license: {
          name: packageJson.licenses[0]?.type ?? 'None',
          identifier: packageJson.licenses[0]?.type,
          url: packageJson.licenses[0]?.url,
        },
        contact: {
          email: packageJson.author.email,
          name: packageJson.author.name,
          url: packageJson.author.url,
        },
      },
      servers: [
        {
          url: `http://127.0.0.1:${env.PORT}`,
          description: 'Desenvolvimento',
        },
        {
          url: 'https://backend-production-93d9.up.railway.app/',
          description: 'Produção',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Insira o token JWT no campo abaixo.',
          },
        },
      },
      tags: [{ name: 'Auth', description: 'End Points de autenticação' }],
    },
  })

  // Hook para validação de segurança da rota de documentação
  await app.register(async (protectedScope) => {
    protectedScope.addHook('onRequest', app.basicAuth)

    // Registro do Scalar UI para documentação
    await protectedScope.register(scalarApiReference, {
      logLevel: 'silent',
      routePrefix: '/docs',
      configuration: {
        title: packageJson.name,
        darkMode: true,
        theme: 'purple',
        showDeveloperTools: 'never',
        hideDownloadButton: false,
        searchHotKey: 'k',
        metaData: {
          title: `API Documentation - ${packageJson.displayName}`,
          description: packageJson.description,
        },
      },
    })
  })
})
