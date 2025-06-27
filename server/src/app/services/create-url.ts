import UrlsRepository from '@/infra/db/repositories/urls-repository'
import { type Either, makeError, makeSuccess } from '@/shared/either'
import type IResponseCreateUrlDTO from '../dtos/IResponseCreateUrlDTO'
import {
  type CreateUrlType,
  createUrlInput,
} from '../dtos/TRequestCreateUrlDTO'
import { UrlShortenedExists } from '../errors/url-shortened-exists'

export async function createUrlService(
  input: CreateUrlType
): Promise<Either<UrlShortenedExists, IResponseCreateUrlDTO>> {
  const { originalUrl, shortenedUrl } = createUrlInput.parse(input)

  const urlsRepository = new UrlsRepository()
  const urlExists = await urlsRepository.findByShortenedUrl(shortenedUrl)

  if (urlExists) {
    return makeError(new UrlShortenedExists())
  }

  const newUrl = await urlsRepository.create({
    originalUrl,
    shortenedUrl,
  })

  return makeSuccess(newUrl)
}
