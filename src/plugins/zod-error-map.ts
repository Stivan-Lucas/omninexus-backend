import i18next, { type ParseKeys } from 'i18next'
import type { z } from 'zod'

/**
 * Baseado na sua definição de interface:
 * export interface $ZodErrorMap<T extends $ZodIssueBase = $ZodIssue>
 */
export const zodErrorMap: z.ZodErrorMap = (issue) => {
  // 1. Criamos a chave base.
  // O Zod 4 separa 'invalid_type', 'too_small', etc.
  let key = `validation.${issue.code}`

  // 2. Tratamento para Strings Específicas (Email, UUID, Regex, etc)
  // De acordo com a sua interface $ZodIssueInvalidStringFormat, o campo é 'format'
  if (issue.code === 'invalid_format' && 'format' in issue) {
    key = `validation.invalid_string.${issue.format}`
  }

  // 3. Tipagem para o i18next
  // ParseKeys garante que 'key' é uma das chaves definidas no seu common.json
  const translationKey = key as ParseKeys

  // 4. Opções de Interpolação
  // Passamos o 'issue' completo para o i18next.
  // Se o JSON tiver "Mínimo {{minimum}}", o i18next pegará do issue automaticamente.
  const options = {
    ...issue,
    path: String(issue.path?.[issue.path.length - 1] ?? 'campo'),
  }

  return {
    message: i18next.t(translationKey, {
      ...options,
      lng: i18next.language,
    }),
  }
}
