import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { Either, makeSuccess } from "@/shared/either"

type GetUrlResponse = {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  accessCount: number;
  createdAt: Date;
}

export async function getUrlsService(): Promise<Either<never, GetUrlResponse[]>> {
  const urls = await db.select({
      id: schema.urls.id,
      originalUrl: schema.urls.originalUrl,
      shortenedUrl: schema.urls.shortenedUrl,
      accessCount: schema.urls.accessCount,
      createdAt: schema.urls.createdAt,
    }).from(schema.urls)

  return makeSuccess(urls)
}