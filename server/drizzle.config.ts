import { DATABASE_URL } from '@/shared/utils/constants-base'
import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: 'src/infra/db/schemas/*',
  out: 'src/infra/db/migrations',
} satisfies Config
