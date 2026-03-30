import bcrypt from 'bcrypt'
import { z } from 'zod'
import { UserService } from '../../modules/users/users.service'
import type { FastifyTypedInstance } from '../../types/fastify'

export async function loginRoute(app: FastifyTypedInstance) {
  app.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const user = await UserService.findByEmail(email)

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return reply.status(401).send({ message: 'Invalid credentials' })
      }

      const token = app.jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        { expiresIn: '1d' },
      )

      return { token }
    },
  )
}
