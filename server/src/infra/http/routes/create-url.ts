import { createUrlInput } from '@/app/dtos/TRequestCreateUrlDTO'
import { createUrlService } from '@/app/services/create-url'
import { isSuccess, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/urls',
    {
      schema: {
        summary: 'Create a new URL',
        tags: ['urls'],
        body: createUrlInput,
        response: {
          201: z.object({
            id: z.string().uuid(),
          }),
          409: z.object({
            message: z
              .string()
              .describe('Error message for conflict, URL already exists'),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await createUrlService({
        originalUrl: request.body.originalUrl,
        shortenedUrl: request.body.shortenedUrl,
      })

      if (isSuccess(result)) {
        return reply.status(201).send({ id: result.success.id })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'UrlShortenedExists':
          return reply.status(409).send({
            message: error.message,
          })
      }
    }
  )
}
