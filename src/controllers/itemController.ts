import { Request, Response } from 'express';
import { Item } from '../models/item';

const items: Item[] = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2' },
];
let nextId = 3;

export const getItems = (_req: Request, res: Response): void => {
  res.status(200).json(items);
};

export const getItemById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

export const createItem = (req: Request, res: Response): void => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Name is required' });
    return;
  }
  const newItem: Item = { id: nextId++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const updateItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const { name, description } = req.body;
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  if (!name) {
    res.status(400).json({ message: 'Name is required' });
    return;
  }

  items[itemIndex] = { ...items[itemIndex], name, description };
  res.status(200).json(items[itemIndex]);
};

export const deleteItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  items.splice(itemIndex, 1);
  res.status(204).send();
};
