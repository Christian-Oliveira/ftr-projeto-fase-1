import { DATABASE_URL } from '@/shared/utils/constants-base'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schema } from './schemas'

export const pg = postgres(DATABASE_URL)
export const db = drizzle(pg, { schema })
