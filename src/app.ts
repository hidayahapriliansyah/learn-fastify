import fastify from 'fastify';
import cookie from '@fastify/cookie';
import itemRoute from './routes/item';
import authRoute from './routes/auth';

const app = fastify({ logger: true });

app.register(cookie, {
  secret: 'test',
  parseOptions: {},
});

app.register(authRoute, { prefix: '/auth' });
app.register(itemRoute, { prefix: '/item' });

app.setErrorHandler((err, req, reply) => {
  return {
    message: err.message,
  }
});

export default app;
