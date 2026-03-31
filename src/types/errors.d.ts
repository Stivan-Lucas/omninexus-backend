import type { GlobalError429ResponseSchema } from '../dtos/globals/errors'

export type ErrorResponse429 = z.infer<typeof GlobalError429ResponseSchema>
