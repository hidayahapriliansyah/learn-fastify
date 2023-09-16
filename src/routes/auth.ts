import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { users } from '../data';

const authRoute = (
  fastify: FastifyInstance,
  option: FastifyPluginOptions,
  done: () => void
): void => {
  fastify.addHook('preHandler', (request, reply, done) => {
    done()
  });

  fastify.post('/signin', (req, rep) => {
    let body: { username?: string, password?: string};
    try {
      const { body: reqBody } = req as {
        body: {
          username?: string,
          password?: string,
        },
      };
      body = reqBody;
    } catch (error: any) {
      throw new Error('Invalid request.');
    }
    const foundUser = users.find((user) => user.username === body.username);
    if (!foundUser) {
      throw new Error('Invalid credential. email');
    }
    if (foundUser.password !== body.password) {
      throw new Error('Invalid credential. password.');
    }
    req.headers = {
      authorization: `Bearer ${foundUser.username}`,
    }
    rep
      .setCookie('exampleCookie', foundUser.username, {
        httpOnly: true,
      })
      .send({
        success: true,
        username: foundUser.username,
      });
  });

  fastify.get('/signup', (req, rep) => {
    return 'signup';
  });

  fastify.get('/logout', (req, rep) => {
    return 'logout';
  });
  done();
};

export default authRoute;
