import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get('/urls', () => {
    return 'Hello World'
  })
}