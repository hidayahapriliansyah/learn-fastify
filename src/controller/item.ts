import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

import { items } from '../data';

const getItems = (req: FastifyRequest, reply: FastifyReply) => {
  return items;
};

const createItem = (req: FastifyRequest, reply: FastifyReply) => {
  let body: { name: string };  
  try {
    const { name } = req.body as { name?: string };
    body = req.body as { name: string };
  } catch (error: any) {
    throw new Error('Invalid request. name property is missing.');
  }
  const newItem = {
    id: uuidv4(),
    name: body.name,
  };
  items.push(newItem);
  return newItem;
};

const getItemById = (req: FastifyRequest, reply: FastifyReply) => {
  const { itemId } = req.params as { itemId: string};

  const foundItem = items.find((item) => itemId === item.id);
  if (!foundItem) {
    throw new Error('Item is not found.');
  }
  return foundItem;
};

const updateItemById = (req: FastifyRequest, reply: FastifyReply) => {
  const { itemId } = req.params as { itemId: string};

  if (!itemId) {
    throw new Error('Invalid request. itemdId param is missing.');
  }

  let body: { name: string };
  try {
    const { name } = req.body as { name?: string };
    body = req.body as { name: string };
  } catch (error: any) {
    throw new Error('Invalid request. name property is missing.');
  }

  const foundItemIndex = items.findIndex((item) => itemId === item.id);
  if (foundItemIndex === -1) {
    throw new Error('Item is not found.');
  }
  items[foundItemIndex] = {
    id: items[foundItemIndex].id,
    name: body.name,
  };

  return items[foundItemIndex];
};

const deleteItemById = (req: FastifyRequest, reply: FastifyReply) => {
  const { itemId } = req.params as { itemId: string};

  const foundItemIndex = items.findIndex((item) => itemId === item.id);
  if (foundItemIndex === -1) {
    throw new Error('Item is not found.');
  }
  items.splice(foundItemIndex, 1);
  return foundItemIndex;
};

export {
  getItems,
  createItem,
  getItemById,
  updateItemById,
  deleteItemById,
};
