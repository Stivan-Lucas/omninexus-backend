import type { LoggerOptions } from "pino";
import { env } from "./env";

const isDev = env.NODE_ENV !== "production";

export const logger: LoggerOptions = isDev
  ? {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
          singleLine: false,
        },
      },
    }
  : {
      level: "info",
      redact: ["req.headers.authorization"],
    };
