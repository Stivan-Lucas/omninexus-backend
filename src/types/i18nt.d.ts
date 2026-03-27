import 'fastify'
import type { TFunction } from 'i18next'
import type en from '../languages/en/common.json'

declare module 'fastify' {
  interface FastifyRequest {
    t: TFunction
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en
    }
  }
}
