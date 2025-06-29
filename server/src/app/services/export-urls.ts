import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { type Either, makeSuccess } from '@/shared/either'
import { stringify } from 'csv-stringify'
import { ilike } from 'drizzle-orm'
import type { IResponseExportUrlsDTO } from '../dtos/IResponseExportUrlsDTO'
import {
  type ExportUrlsType,
  exportUrlsInput,
} from '../dtos/TRequestExportUrlsDTO'

export async function exportUrlsService(
  input: ExportUrlsType
): Promise<Either<never, IResponseExportUrlsDTO>> {
  const { searchQuery } = exportUrlsInput.parse(input)

  const { sql, params } = db
    .select()
    .from(schema.urls)
    .where(
      searchQuery
        ? ilike(schema.urls.shortenedUrl, `%${searchQuery}%`)
        : undefined
    )
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'URL Original' },
      { key: 'shortened_url', header: 'URL Encurtada' },
      { key: 'access_count', header: 'Total de Acessos' },
      { key: 'created_at', header: 'Data de Criação' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    folder: 'downloads',
    fileName: `${new Date().toISOString()}-urls.csv`,
    contentType: 'text/csv',
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeSuccess({ urlDownload: url })
}
