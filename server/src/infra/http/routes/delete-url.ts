import { deleteUrlService } from '@/app/services/delete-url'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/urls/:urlId',
    {
      schema: {
        summary: 'delete URL',
        response: {
          404: z.object({
            message: z.string().describe('Error message for URL not found'),
          }),
        }
      },
    },
    async (request, reply) => {
      const { urlId } = request.params as { urlId: string }

      await deleteUrlService({
        urlId: urlId,
      })
    }
  )
}