import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { query, param } from 'express-validator';

import cors from 'cors';
import mongoose from 'mongoose';

import { getBackupsRouter } from './routes/get-backups';
import { createBackupsRouter } from './routes/create-backups';


import pokemonSchema from './schema/pokemon';
import cardsSchema from './schema/cards';

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
const Cards = mongoose.model('Cards', cardsSchema);

const app = express();
app.use(json());
app.use(cors());
app.use(getBackupsRouter);
app.use(createBackupsRouter);

app.get(
  '/api/search/:id',
  [
    param('id').isString().withMessage('Sorry, this isn\'t a valid ID'),
    query('name').isString().withMessage('Sorry, this isn\'t a valid name'),
    query('rarity').isString().withMessage('Sorry, this isn\'t a valid rarity'),
    query('hp').isString().withMessage('Sorry, this isn\'t a valid hp'),
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
    .catch((err) => console.log(err));
  }
);

app.get(
  '/api/collections/:id',
  [
    param('id').isString().withMessage('Sorry! that ID is invalid')
  ],
  (req: Request, res: Response) => {
    const { id } = req.params;
    Cards.findOne({ _id: id })
      .populate('cards')
      .then((results: any) => res.send(results))
      .catch((err: Error) => res.send(err));
  }
)

app.delete(
  '/api/collections/:id',
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

app.listen(4000, () => {
  console.log('Listening on port 4000');

  mongoose.connect('mongodb://mongo:27017/pokemon', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is now connected'))
    .catch((err: Error) => console.log(err));
});
