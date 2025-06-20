import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

const createUrlInput = z.object({
    originalUrl: z.string().url(),
    shortenedUrl: z.string().url(),
})

type CreateUrlType = z.input<typeof createUrlInput>

export async function createUrlService(input: CreateUrlType) {
    const { originalUrl, shortenedUrl } = createUrlInput.parse(input)
    
    await db.insert(schema.urls).values({ originalUrl, shortenedUrl })
}