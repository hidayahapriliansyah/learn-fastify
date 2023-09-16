import {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction
} from 'fastify';
import config from '../config';

const userAuth = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (!req.cookies[config.accessCookieName]) {
    throw new Error('Cookie gak ada cok.');
  }
  req.routeOptions.config
  done();
};

export default userAuth;
