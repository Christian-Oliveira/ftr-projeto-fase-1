import z from 'zod'

export type UrlResonseType = {
  id: string,
  originalUrl: string,
  shortenedUrl: string,
  accessCount: number,
}

const regexHttpValid = /^https?:\/\/.+$/i
const regexUrlShortenedValid = /^[a-zA-Z0-9-]+$/

export const urlInputs = z.object({
  originalUrl: z
    .string()
    .trim()
    .regex(regexHttpValid, {
      message: "A URL deve começar com http:// ou https://",
    })
    .url()
    .toLowerCase(),
  shortenedUrl: z
    .string()
    .trim()
    .regex(regexUrlShortenedValid, {
      message: "Somente letras, números e hífen (-) são permitidos.",
    })
    .toLowerCase(),
})

export type UrlRequestType = z.infer<typeof urlInputs>

export const urlsResponseAdapter = (urls: UrlResonseType[]) => (
  urls.map(url => ({
    id: url.id,
    originalUrl: url.originalUrl,
    shortenedUrl: url.shortenedUrl,
    accessCount: url.accessCount,
  }))
)

export const urlRequestAdapter = (data: UrlRequestType) => ({
  originalUrl: data.originalUrl,
  shortenedUrl: data.shortenedUrl,
})