import fp from 'fastify-plugin'
import i18next from 'i18next'

import en from '../languages/en/common.json'
import pt from '../languages/pt/common.json'
import type { FastifyTypedInstance } from '../types/fastify'

export const i18nPlugin = fp(async (app: FastifyTypedInstance) => {
  await i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    load: 'languageOnly',
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    interpolation: {
      escapeValue: false,
    },
  })

  app.addHook('onRequest', async (request) => {
    const acceptLanguage = request.headers['accept-language'] ?? ''
    request.t = i18next.getFixedT(acceptLanguage)
  })
})
