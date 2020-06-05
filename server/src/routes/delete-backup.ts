import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { param } from 'express-validator';

import pokemonSchema from '../schema/pokemon';
import cardsSchema from '../schema/cards';

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
const Cards = mongoose.model('Cards', cardsSchema);

const router = express.Router();

router.delete(
  '/api/backup/:id',
  [
    param('id').isString().withMessage('Sorry! that ID is invalid')
  ],
  (req: Request, res: Response) => {
    const { id } = req.params;

    Pokemon.deleteMany({
      cardsId: id
    })
    .then(() => {
      return Cards.deleteMany({ _id: id })
    })
    .then((result: any) => res.send(result))
    .catch((err: any) => res.send(err));
});

export { router as deleteBackupRouter }
