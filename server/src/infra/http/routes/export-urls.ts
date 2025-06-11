import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const exportUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get('/urls/export', () => {
    return 'Hello World'
  })
}