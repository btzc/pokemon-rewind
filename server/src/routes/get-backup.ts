import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {  param } from 'express-validator';

import cardsSchema from '../schema/cards';
const Cards = mongoose.model('Cards', cardsSchema);

const router = express.Router();

router.get(
  '/api/backup/:id',
  [
    param('id').trim().isString().withMessage('Sorry! that ID is invalid')
  ],
  (req: Request, res: Response) => {
    const { id } = req.params;
    Cards.findOne({ _id: id })
      .populate('cards')
      .then((results: any) => res.send(results))
      .catch((err: Error) => res.send({ error: err }));
  }
);

export { router as getBackupRouter }
