import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const deleteUrlInput = z.object({
    urlId: z.string().uuid(),
})

type DeleteUrlType = z.input<typeof deleteUrlInput>

export async function deleteUrlService(input: DeleteUrlType) {
    const { urlId } = deleteUrlInput.parse(input)
    await db.delete(schema.urls).where(eq(schema.urls.id, urlId))
}