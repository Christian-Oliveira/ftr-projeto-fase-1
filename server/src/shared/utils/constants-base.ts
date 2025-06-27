import { env } from '@/env'

export const DATABASE_URL = `${env.DB_DRIVER}://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`
