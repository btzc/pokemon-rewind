import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { query, param, body } from 'express-validator';

import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose';

import attackSchema from './schema/attack';
import pokemonSchema from './schema/pokemon';
import weaknessSchema from './schema/weakness';
import cardsSchema from './schema/cards';

const Attack = mongoose.model('Attack', attackSchema);
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
const Weakness = mongoose.model('Weakness', weaknessSchema);
const Cards = mongoose.model('Cards', cardsSchema);

const app = express();
app.use(json());
app.use(cors());

app.get('/api/collections', (req: Request, res: Response) => {
  Cards.find({})
    .then((result) => res.send(result))
    .catch((err) => console.log(err));

});

app.post(
  '/api/create',
  [
    body('name').isString().withMessage('Please enter a valid name')
  ],
  async (req: Request, res: Response) => {
    try {
      const resp = await axios.get('https://api.pokemontcg.io/v1/cards?setCode=det1');

      const attacks = resp.data.cards.map(({attacks}: any) => {
        return attacks.map((attack: any) => new Attack({...attack}));
      });

      const weaknesses = resp.data.cards.map(({weaknesses}: any) => {
        return weaknesses.map((weakness: any) => new Weakness({...weakness}));
      });
      
      const cardsId = new mongoose.Types.ObjectId;
      const pokemons = resp.data.cards.map(
        (pokemon: any) => {
          return new Pokemon({
            cardsId,
            attacks: attacks,
            weaknesses: weaknesses,
            ...pokemon
          })
        });

      console.log(req.body.name);

      const cards = new Cards({
        _id: cardsId,
        name: req.body.name,
        date: new Date(),
        cards: pokemons.map(({_id}: any) => _id)
      });

      Pokemon.insertMany(pokemons)
        .then(() => {
          return cards.save();
        }).then((result) => {
          res.send(result);
        })
        .catch(err => res.send(err));
    } catch (err) {
      res.send(err);
    }
  }
);

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

    Pokemon.find({
      cardsId: id,
      ...req.query
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
