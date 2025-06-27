import {
  URL_INVALID_PREFIX_MESSAGE,
  USE_ONLY_LETTERS_NUMBERS_AND_HYPHENS,
} from '@/shared/utils/constants-messages'
import { z } from 'zod'

export const createUrlInput = z.object({
  originalUrl: z
    .string()
    .trim()
    .url()
    .regex(/^https?:\/\/.+$/, {
      message: URL_INVALID_PREFIX_MESSAGE,
    })
    .toLowerCase(),
  shortenedUrl: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, { message: USE_ONLY_LETTERS_NUMBERS_AND_HYPHENS })
    .trim()
    .toLowerCase(),
})

export type CreateUrlType = z.input<typeof createUrlInput>
