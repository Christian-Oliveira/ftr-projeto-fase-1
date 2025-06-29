import { exportUrlsService } from '@/app/services/export-urls'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/urls/export',
    {
      schema: {
        summary: 'Export URLs',
        tags: ['urls'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          201: z.object({
            urlDownload: z.string().url(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query
      const result = await exportUrlsService({ searchQuery })

      const urlDownload = unwrapEither(result)

      return reply.status(201).send(urlDownload)
    }
  )
}
