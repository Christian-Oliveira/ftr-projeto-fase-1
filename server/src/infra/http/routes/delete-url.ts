import { deleteUrlService } from '@/app/services/delete-url'
import { isError, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/urls/:urlId',
    {
      schema: {
        summary: 'delete URL',
        tags: ['urls'],
        response: {
          404: z.object({
            message: z.string().describe('Error message for URL not found'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { urlId } = request.params as { urlId: string }

      const result = await deleteUrlService({
        urlId: urlId,
      })

      if (result === undefined) {
        return reply.status(204).send()
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
