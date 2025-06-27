import UrlsRepository from '@/infra/db/repositories/urls-repository'
import { type Either, makeError } from '@/shared/either'
import { z } from 'zod'
import { UrlNotExists } from '../errors/url-not-exists'

const deleteUrlInput = z.object({
  urlId: z.string().uuid(),
})

type DeleteUrlType = z.input<typeof deleteUrlInput>

export async function deleteUrlService(
  input: DeleteUrlType
): Promise<Either<UrlNotExists, never> | undefined> {
  const { urlId } = deleteUrlInput.parse(input)
  const urlsRepository = new UrlsRepository()

  const urlExists = await urlsRepository.findById(urlId)

  if (!urlExists) {
    return makeError(new UrlNotExists())
  }

  await urlsRepository.delete(urlId)
}
