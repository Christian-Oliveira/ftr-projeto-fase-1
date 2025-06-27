import { getOriginalUrlService } from '@/app/services/get-original-url'
import { isSuccess, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/urls/:shortenedUrl',
    {
      schema: {
        summary: 'Get original URL by shortened URL',
        tags: ['urls'],
        response: {
          200: z.object({
            originalUrl: z.string().url(),
          }),
          404: z.object({
            message: z.string().describe('Error message for URL not found'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params as { shortenedUrl: string }
      const result = await getOriginalUrlService({
        shortenedUrl: shortenedUrl,
      })

      if (isSuccess(result)) {
        return reply
          .status(200)
          .send({ originalUrl: result.success.originalUrl })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'UrlNotExists':
          return reply.status(404).send({
            message: error.message,
          })
      }
    }
  )
}
