import { z } from 'zod'

export const getOriginalUrlInput = z.object({
  shortenedUrl: z.string().trim().toLowerCase(),
})

export type GetOriginalUrlType = z.input<typeof getOriginalUrlInput>
