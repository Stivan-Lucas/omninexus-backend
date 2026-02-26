import Fastify from "fastify";
import { logger } from "./utils/logger";
import { env } from "./utils/env";

const fastify = Fastify({
  logger,
  genReqId: () => crypto.randomUUID(),
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
