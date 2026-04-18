import Fastify, { type FastifyInstance } from 'fastify';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.PORT ?? 3000);

/**
 * Register Fastify plugins (API routes, auth, etc.).
 * Future phases will add plugins here.
 */
async function registerPlugins(_server: FastifyInstance) {
   // Phase 3+: API plugins will be registered here
   // e.g. server.register(authPlugin, { prefix: "/api" })
}

async function bootstrap() {
   const app = next({ dev, hostname: host, port });
   const handle = app.getRequestHandler();

   await app.prepare();

   const server = Fastify({ logger: true });

   await registerPlugins(server);

   // Catch-all: delegate everything else to Next.js
   server.all('/*', async (request, reply) => {
      await handle(request.raw, reply.raw);
      reply.hijack();
   });

   await server.listen({ host, port });

   // Graceful shutdown
   const shutdown = async (signal: string) => {
      server.log.info(`Received ${signal}, shutting down...`);
      await server.close();
      process.exit(0);
   };

   process.on('SIGINT', () => shutdown('SIGINT'));
   process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch(error => {
   console.error('Failed to start server', error);
   process.exit(1);
});
