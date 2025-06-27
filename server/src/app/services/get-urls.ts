import UrlsRepository from '@/infra/db/repositories/urls-repository'
import { type Either, makeSuccess } from '@/shared/either'
import type IResponseUrlDTO from '../dtos/IResponseUrlDTO'

export async function getUrlsService(): Promise<
  Either<never, IResponseUrlDTO[]>
> {
  const urlsRepository = new UrlsRepository()

  const urls = await urlsRepository.findAll()

  return makeSuccess(urls)
}
