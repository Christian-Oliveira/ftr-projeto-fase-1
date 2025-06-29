import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'
import {
  type UploadFileToStorageInput,
  uploadFileToStorageInput,
} from '@/app/dtos/TRequestUploadFileToStorageDTO'
import { env } from '@/env'
import { Upload } from '@aws-sdk/lib-storage'
import { s3 } from './client'

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { folder, fileName, contentType, contentStream } =
    uploadFileToStorageInput.parse(input)

  const fileExtension = extname(fileName)
  const baseFileName = basename(fileName)
  const sanitizedFileName = baseFileName.replace(/[^a-zA-Z0-9]/g, '')
  const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

  const upload = new Upload({
    client: s3,
    params: {
      Key: uniqueFileName,
      Bucket: env.AWS_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.AWS_PUBLIC_URL_BUCKET).toString(),
  }
}
