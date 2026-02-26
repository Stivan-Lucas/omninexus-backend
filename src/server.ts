import Fastify from "fastify";
import { env } from "./utils/env";
import { getLoggerOptions } from "./utils/logger";

const app = Fastify({
	logger: getLoggerOptions(),
	genReqId: () => crypto.randomUUID(),
});

// Rotas
app.get("/", async () => {
	return { status: "ok", message: "Bun + Fastify is running" };
});

/**
 * Gerenciamento de encerramento (Graceful Shutdown)
 */
const handleShutdown = async () => {
	app.log.info("Shutting down gracefully...");
	try {
		await app.close();
		app.log.info("Server closed. Goodbye!");
		process.exit(0);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

// Sinais que o sistema operacional envia para parar o processo
process.on("SIGINT", handleShutdown); // Ctrl+C
process.on("SIGTERM", handleShutdown); // Comando de parada (ex: Docker/PM2)

/**
 * Inicialização
 */
const start = async () => {
	try {
		await app.listen({
			port: env.PORT,
			host: env.HOST,
		});
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
