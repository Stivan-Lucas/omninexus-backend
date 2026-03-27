import 'fastify'
import 'i18next'
import type { i18n, TFunction } from 'i18next'
import type en from '../languages/en/common.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    t: TFunction
    i18n: i18n
    resolvedLanguage: string
  }
}
