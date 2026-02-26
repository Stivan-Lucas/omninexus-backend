import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().int().positive().default(3333),
    HOST: z.string().min(1).default("0.0.0.0"),

    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),

    LOG_ROTATION_SIZE: z.string().default("100m"),
    LOG_ROTATION_INTERVAL: z.string().default("1d"),
    LOG_KEEP_COUNT: z.coerce.number().int().positive().default(7),

    DATABASE_URL: z.string().min(1),
  })
  .strict();

const result = envSchema.safeParse(Bun.env);

if (!result.success) {
  console.error("❌ Invalid environment variables:");
  const tree = z.treeifyError(result.error);
  console.error(tree);
  process.exit(1);
}

export const env = result.data;
export type Env = z.infer<typeof envSchema>;
