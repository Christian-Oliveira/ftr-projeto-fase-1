import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const deleteUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/urls', () => {
    return 'Hello World'
  })
}