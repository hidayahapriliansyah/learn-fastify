import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { userAuth } from '../middleware';
import * as itemController from '../controller/item';

const itemRoute = (fastify: FastifyInstance, option: FastifyPluginOptions, done: () => void) => {
  fastify.addHook('preHandler', userAuth);

  fastify.get('/', itemController.getItems);
  fastify.post('/', itemController.createItem);
  fastify.get('/:itemId', itemController.getItemById);
  fastify.put('/:itemId', itemController.updateItemById);
  fastify.delete('/:itemId', itemController.deleteItemById);
  done();
};

export default itemRoute;
