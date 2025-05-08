"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2' },
];
let nextId = 3;
const getItems = (_req, res) => {
    res.status(200).json(items);
};
exports.getItems = getItems;
const getItemById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find((i) => i.id === id);
    if (item) {
        res.status(200).json(item);
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
};
exports.getItemById = getItemById;
const createItem = (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Name is required' });
        return;
    }
    const newItem = { id: nextId++, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
};
exports.createItem = createItem;
const updateItem = (req, res) => {
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
exports.updateItem = updateItem;
const deleteItem = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
        res.status(404).json({ message: 'Item not found' });
        return;
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
};
exports.deleteItem = deleteItem;
