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
    // 1. Pega o idioma do header ou fallback para 'pt'
    const headerLang = req.headers['accept-language']?.split(',')[0] || 'pt'

    // 2. Resolve o código (ex: 'pt-BR' vira 'pt')
    const resolved =
      i18next.services.languageUtils.getLanguagePartFromCode(headerLang)

    // 3. ATUALIZA o idioma da instância global do i18next
    // Isso é crucial porque o zodErrorMap usa o 'i18next' importado diretamente
    if (i18next.language !== resolved) {
      await i18next.changeLanguage(resolved)
    }

    // 4. Preenche as propriedades do request para uso nos Controllers
    req.resolvedLanguage = resolved
    req.t = i18next.getFixedT(resolved)

    // 5. Define o header de resposta
    reply.header('Content-Language', resolved)
  })
})
