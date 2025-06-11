import { randomUUID } from 'node:crypto'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const urls = pgTable('urls', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  originalUrl: text('original_url').notNull(),
  shortenedUrl: text('shortened_url').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})