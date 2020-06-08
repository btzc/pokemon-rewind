import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { query, param } from 'express-validator';

import pokemonSchema from '../schema/pokemon';
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

const router = express.Router();

router.get(
  '/api/backup/:id/search',
  [
    param('id').trim().isString().withMessage('Sorry, this isn\'t a valid ID'),
    query('name').trim().isString().withMessage('Sorry, this isn\'t a valid name'),
    query('rarity').trim().isString().withMessage('Sorry, this isn\'t a valid rarity'),
    query('hp').trim().isString().withMessage('Sorry, this isn\'t a valid hp'),
  ],
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, rarity, hp } = req.query;

    const query: {name?: any, rarity?: any, hp?: any} = {};

    if (name) {
      query.name = { "$regex": name, "$options": "i" }
    }
    if (rarity) {
      query.rarity = { "$regex": rarity, "$options": "i" }
    }
    if (hp) {
      query.hp = { "$regex": hp, "$options": "i" }
    }

    Pokemon.find({
      cardsId: id,
      ...query
    })
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: err }));
  }
);

export { router as searchBackupRouter }

