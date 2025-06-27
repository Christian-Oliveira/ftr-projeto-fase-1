import UrlsRepository from '@/infra/db/repositories/urls-repository'
import { type Either, makeError, makeSuccess } from '@/shared/either'
import type IResponseUrlDTO from '../dtos/IResponseUrlDTO'
import {
  type GetOriginalUrlType,
  getOriginalUrlInput,
} from '../dtos/TRequestGetOriginalUrlDTO'
import { UrlNotExists } from '../errors/url-not-exists'

export async function getOriginalUrlService(
  input: GetOriginalUrlType
): Promise<Either<UrlNotExists, IResponseUrlDTO>> {
  const { shortenedUrl } = getOriginalUrlInput.parse(input)

  const urlsRepository = new UrlsRepository()
  const url = await urlsRepository.findByShortenedUrl(shortenedUrl)

  if (!url) {
    return makeError(new UrlNotExists())
  }

  urlsRepository.IncrementAccessCount(url.id, url.accessCount)

  return makeSuccess(url)
}
