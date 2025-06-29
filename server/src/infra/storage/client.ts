import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  region: 'us-east-2',
  // endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})
