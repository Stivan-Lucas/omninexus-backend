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

  app.addHook('onRequest', async (req, res) => {
    const acceptLanguage = (req.headers['accept-language'] as string) ?? 'en'

    const resolved =
      i18next.services.languageUtils.getLanguagePartFromCode(acceptLanguage)

    req.t = i18next.getFixedT(acceptLanguage)
    req.i18n = i18next
    req.resolvedLanguage = resolved
    res.header('Content-Language', resolved)
  })
})
