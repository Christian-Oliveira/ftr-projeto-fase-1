import { randomUUID } from 'node:crypto'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const urls = pgTable('urls', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  originalUrl: text('original_url').notNull(),
  shortenedUrl: text('shortened_url').notNull().unique(),
  accessCount: integer('access_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})