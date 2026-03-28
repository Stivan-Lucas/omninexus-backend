import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { db } from '../../database/db'
import { users } from '../../database/schema'

export const UserService = {
  async createMaster(data: { name: string; email: string; password: string }) {
    const passwordHash = await bcrypt.hash(data.password, 10)

    return await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash,
        role: 'admin',
      })
      .returning({ id: users.id, email: users.email })
  },

  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    return result[0]
  },
}
