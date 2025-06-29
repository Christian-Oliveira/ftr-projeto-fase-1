import { z } from 'zod'

export const exportUrlsInput = z.object({
  searchQuery: z.string().optional(),
})

export type ExportUrlsType = z.input<typeof exportUrlsInput>
