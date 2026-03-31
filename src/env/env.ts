import z from 'zod'
import { t } from '../lib/i18n'

const sizeRegex = /^\d+(k|m|g)$/i
const intervalRegex = /^\d+(s|m|h|d)$/i
const rateLimitTimeRegex =
  /^\d+\s?(ms|s|m|h|d|second|seconds|minute|minutes|hour|hours|day|days|week)$/i

const envSchema = z.object({
  // Server Config
  NODE_ENV: z.enum(['development', 'production', 'test'], {
    message: t('errors.env.invalid_node_env'),
  }),
  PORT: z.coerce.number().int().positive(t('errors.env.invalid_port')),
  HOST: z.string().min(1, t('errors.env.host_required')),

  // LOGS Config
  LOG_LEVEL: z.enum(
    [
      'trace',
      'debug',
      'info',
      'notice',
      'warn',
      'error',
      'critical',
      'alert',
      'emergency',
      'fatal',
      'all',
      'off',
    ],
    {
      message: t('errors.env.invalid_log_level'),
    },
  ),
  LOG_ROTATION_SIZE: z.string().regex(sizeRegex, t('errors.env.invalid_size')),
  LOG_ROTATION_INTERVAL: z
    .string()
    .regex(intervalRegex, t('errors.env.invalid_interval')),
  LOG_KEEP_COUNT: z.coerce.number().int().positive(),

  // CORS Config
  CORS_ORIGIN: z.string(),
  CORS_METHODS: z
    .string()
    .transform((val) => val.split(',').map((v) => v.trim().toUpperCase())),
  CORS_ALLOWED_HEADERS: z
    .string()
    .transform((val) => val.split(',').map((v) => v.trim())),

  // SAGGER Login Config
  SWAGGER_USER: z.string().min(1, t('errors.env.swagger_required')),
  SWAGGER_PASS: z.string().min(1, t('errors.env.swagger_required')),

  // Rate Limite Config
  RATE_LIMIT_MAX: z.coerce
    .number()
    .int()
    .positive(t('errors.env.invalid_rate_limit_max')),
  RATE_LIMIT_WINDOW: z
    .string()
    .regex(rateLimitTimeRegex, t('errors.env.invalid_rate_limit_window')),
  RATE_LIMIT_SKIP_PATHS: z.string().transform((val) =>
    val
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean),
  ),

  // Database Config
  DATABASE_URL: z.string(),

  // JWT Config
  JWT_SECRET: z.string().min(1),
})

const _env = envSchema.safeParse(Bun.env)

if (!_env.success) {
  console.error(t('errors.env.invalid_variables'))
  const tree = z.treeifyError(_env.error)
  console.error(tree)
  process.exit(1)
}

export const env = _env.data
export const isDev = env.NODE_ENV !== 'production'
export const isTest = env.NODE_ENV === 'test'
