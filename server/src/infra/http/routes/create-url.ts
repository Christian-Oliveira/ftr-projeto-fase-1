import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/urls',
    {
      schema: {
        summary: 'Create a new URL',
        body: z.object({
          name: z.string().min(1, 'Name is required'),
        }),
        response: {
          200: z.string().describe('Returns a success message'),
        }
      },
    },
    async (request, reply) => {
      return 'Hello World'
    }
  )
}