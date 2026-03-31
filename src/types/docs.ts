import type { API_TAGS } from '../config/tags'

export type ApiTagName = (typeof API_TAGS)[keyof typeof API_TAGS]
