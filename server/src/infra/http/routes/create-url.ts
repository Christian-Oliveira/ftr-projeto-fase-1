import { createUrlService } from '@/app/services/create-url'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/urls',
    {
      schema: {
        summary: 'Create a new URL',
        body: z.object({
          originalUrl: z.string().min(1, 'URL original is required').url('Invalid URL format'),
          shortenerUrl: z.string().min(1, 'URL shortener is required').url('Invalid URL format'),
        }),
        response: {
          201: z.object({
            urlId: z.string().uuid(),
          }),
          400: z.object({
            message: z.string().describe('Error message for invalid input'),
          }),
          409: z.object({
            message: z.string().describe('Error message for conflict, URL already exists'),
          }),
        }
      },
    },
    async (request, reply) => {
      const urlId = await createUrlService({
        originalUrl: request.body.originalUrl,
        shortenedUrl: request.body.shortenerUrl,
      })

      return urlId
    }
  )
}