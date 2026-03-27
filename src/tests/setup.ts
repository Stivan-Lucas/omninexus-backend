import { app } from '../app'

export async function setupTestApp() {
  await app.ready()
  return app
}
