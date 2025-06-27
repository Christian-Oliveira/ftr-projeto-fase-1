import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createUrlRoute } from './routes/create-url'
import { deleteUrlRoute } from './routes/delete-url'
import { exportUrlsRoute } from './routes/export-urls'
import { getOriginalUrlRoute } from './routes/get-original-url'
import { getUrlsRoute } from './routes/get-urls'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      error: 'Response Validation Error',
      message: "Request doesn't match the schema",
      statusCode: 400,
      details: error.validation.map(err => err.params.issue),
    })
  }
  console.error(error)
  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'URL Shortener API',
      description: 'API for managing shortened URLs',
      version: '1.0.0',
    },
    tags: [{ name: 'urls' }],
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(getUrlsRoute)
server.register(getOriginalUrlRoute)
server.register(createUrlRoute)
server.register(deleteUrlRoute)
server.register(exportUrlsRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})
