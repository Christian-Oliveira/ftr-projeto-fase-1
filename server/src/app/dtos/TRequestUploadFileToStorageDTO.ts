import { Readable } from 'node:stream'
import { z } from 'zod'

export const uploadFileToStorageInput = z.object({
  folder: z.enum(['downloads']),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

export type UploadFileToStorageType = z.input<typeof uploadFileToStorageInput>
