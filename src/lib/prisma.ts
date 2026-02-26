import { PrismaClient } from "../generated/prisma/client";
import { env } from "../utils/env";

// 1. Definimos o tipo para o objeto global
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

// 2. Instanciamos o prisma (reutilizando se já existir)
export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		accelerateUrl: env.DATABASE_URL,
		log:
			env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});

// 3. Em desenvolvimento, salvamos a instância no globalThis
if (env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
