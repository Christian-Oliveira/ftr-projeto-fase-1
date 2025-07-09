import type IResponseUrlDTO from '@/app/dtos/IResponseUrlDTO'
import { desc, eq, ilike } from 'drizzle-orm'
import { db, pg } from '..'
import { schema } from '../schemas'

type CreateUrlType = {
  originalUrl: string
  shortenedUrl: string
}

interface IUrlsRepository {
  findAll(): Promise<IResponseUrlDTO[]>
  create(data: CreateUrlType): Promise<{ id: string }>
  findByShortenedUrl(shortenedUrl: string): Promise<IResponseUrlDTO | undefined>
  findById(id: string): Promise<IResponseUrlDTO | undefined>
  IncrementAccessCount(id: string, currentAccessCount: number): Promise<void>
  delete(id: string): Promise<void>
  getUrlsCursorBySearchQuery(
    searchQuery?: string
  ): AsyncIterable<IResponseUrlDTO[]>
}

export default class UrlsRepository implements IUrlsRepository {
  async findAll(): Promise<IResponseUrlDTO[]> {
    try {
      const urls = await db
        .select({
          id: schema.urls.id,
          originalUrl: schema.urls.originalUrl,
          shortenedUrl: schema.urls.shortenedUrl,
          accessCount: schema.urls.accessCount,
          createdAt: schema.urls.createdAt,
        })
        .from(schema.urls)
        .orderBy(desc(schema.urls.createdAt))

      return urls
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao buscar todas as URLs.')
    }
  }

  async create(data: CreateUrlType): Promise<{ id: string }> {
    try {
      const { originalUrl, shortenedUrl } = data
      const newUrl = await db
        .insert(schema.urls)
        .values({ originalUrl, shortenedUrl })
        .returning({ id: schema.urls.id })

      return newUrl.length > 0 ? newUrl[0] : { id: '' }
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao criar nova URL.')
    }
  }

  async findByShortenedUrl(
    shortenedUrl: string
  ): Promise<IResponseUrlDTO | undefined> {
    try {
      const url = await db
        .select({
          id: schema.urls.id,
          originalUrl: schema.urls.originalUrl,
          shortenedUrl: schema.urls.shortenedUrl,
          accessCount: schema.urls.accessCount,
          createdAt: schema.urls.createdAt,
        })
        .from(schema.urls)
        .where(eq(schema.urls.shortenedUrl, shortenedUrl))
        .limit(1)

      return url.length > 0 ? url[0] : undefined
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao buscar URL pelo URL encurtada.')
    }
  }

  async findById(id: string): Promise<IResponseUrlDTO | undefined> {
    try {
      const url = await db
        .select({
          id: schema.urls.id,
          originalUrl: schema.urls.originalUrl,
          shortenedUrl: schema.urls.shortenedUrl,
          accessCount: schema.urls.accessCount,
          createdAt: schema.urls.createdAt,
        })
        .from(schema.urls)
        .where(eq(schema.urls.id, id))
        .limit(1)

      return url.length > 0 ? url[0] : undefined
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao buscar URL pelo ID.')
    }
  }

  async IncrementAccessCount(
    id: string,
    currentAccessCount: number
  ): Promise<void> {
    try {
      await db
        .update(schema.urls)
        .set({ accessCount: currentAccessCount + 1 })
        .where(eq(schema.urls.id, id))
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao incrementar contagem de acessos da URL.')
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.delete(schema.urls).where(eq(schema.urls.id, id))
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao deletar URL.')
    }
  }

  getUrlsCursorBySearchQuery(
    searchQuery?: string
  ): AsyncIterable<IResponseUrlDTO[]> {
    try {
      const { sql, params } = db
        .select()
        .from(schema.urls)
        .where(
          searchQuery
            ? ilike(schema.urls.shortenedUrl, `%${searchQuery}%`)
            : undefined
        )
        .toSQL()

      const cursor = pg.unsafe(sql, params as string[]).cursor(100)

      return cursor as AsyncIterable<IResponseUrlDTO[]>
    } catch (error) {
      console.log(error)
      throw new Error('Falha ao buscar URLs.')
    }
  }
}
