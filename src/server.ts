import Fastify from "fastify";
import { env } from "./utils/env";
import { logger } from "./utils/logger";

const fastify = Fastify({
  logger,
  genReqId: () => crypto.randomUUID(),
});

fastify.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
