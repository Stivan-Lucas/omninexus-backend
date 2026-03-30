import fp from 'fastify-plugin'
import i18next, { type TFunction } from 'i18next'
import en from '../languages/en/common.json'
import pt from '../languages/pt/common.json'
import type { FastifyTypedInstance } from '../types/fastify'

export const i18nPlugin = fp(async (app: FastifyTypedInstance) => {
  if (!i18next.isInitialized) {
    await i18next.init({
      lng: 'pt',
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
  }

  app.decorateRequest('t', (() => '') as TFunction)
  app.decorateRequest('i18n', {
    getter() {
      return i18next
    },
  })
  app.decorateRequest('resolvedLanguage', 'pt')

  app.addHook('onRequest', async (req, reply) => {
    const headerLang = req.headers['accept-language']?.split(',')[0] || 'pt'

    const resolved =
      i18next.services.languageUtils.getLanguagePartFromCode(headerLang)

    req.resolvedLanguage = resolved
    req.t = i18next.getFixedT(resolved)

    reply.header('Content-Language', resolved)
  })
})
