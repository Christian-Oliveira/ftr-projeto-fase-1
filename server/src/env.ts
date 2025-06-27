import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DB_DRIVER: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_NAME: z.string(),
})

export const env = envSchema.parse(process.env)
