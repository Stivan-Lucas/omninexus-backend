export const API_TAGS = {
  WELCOME: {
    name: 'Welcome',
    description: 'Endpoints para testar se backend está respondendo!',
  },
  USERS: {
    name: 'Users',
    description: 'Endpoints relacionados a usuários',
  },
} as const

export type ApiTagName = (typeof API_TAGS)[keyof typeof API_TAGS]
