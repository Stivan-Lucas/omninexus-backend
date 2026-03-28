import { beforeAll, describe, expect, test } from 'bun:test'
import type { FastifyTypedInstance } from '../types/fastify'
import { setupTestApp } from './setup'

describe('OmniNexus API Functional Tests', () => {
  let server: FastifyTypedInstance

  beforeAll(async () => {
    server = await setupTestApp()
  })

  test('GET / - Deve retornar 200 OK com a mensagem traduzida', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
      headers: { 'accept-language': 'pt' },
    })
    expect(response.statusCode).toBe(200)
    expect(response.json().message).toBe('Olá Mundo')
  })

  test('GET / - Deve bloquear após exceder o limite (Rate Limit)', async () => {
    const LIMIT = 100

    for (let i = 0; i < LIMIT; i++) {
      await server.inject({
        method: 'GET',
        url: '/',
        remoteAddress: '127.0.0.1',
      })
    }

    const response = await server.inject({
      method: 'GET',
      url: '/',
      remoteAddress: '127.0.0.1',
    })

    expect(response.statusCode).toBe(429)
    expect(response.json().error).toBe('Too Many Requests')
  })
})
