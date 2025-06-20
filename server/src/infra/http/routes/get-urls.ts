import { getUrlsService } from '@/app/services/get-urls'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/urls',
    {
      schema: {
        summary: 'List URLs',
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              originalUrl: z.string().url(),
              shortenedUrl: z.string().url(),
              accessCount: z.number().int().nonnegative(),
              createdAt: z.date(),
            })
          ).describe('List of URLs'),
        }
      },
    },
    async (request, reply) => {
      const result = await getUrlsService()

      const urls = unwrapEither(result)

      return reply.status(200).send(urls)
    }
  )
}