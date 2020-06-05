import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { query, param, body } from 'express-validator';
import axios from 'axios';

import attackSchema from '../schema/attack';
import pokemonSchema from '../schema/pokemon';
import weaknessSchema from '../schema/weakness';
import cardsSchema from '../schema/cards';

const Attack = mongoose.model('Attack', attackSchema);
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
const Weakness = mongoose.model('Weakness', weaknessSchema);
const Cards = mongoose.model('Cards', cardsSchema);

const router = express.Router();

router.post(
  '/api/backups/create',
  [
    body('name').trim().isString().withMessage('Please enter a valid name')
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

export { router as createBackupsRouter }

