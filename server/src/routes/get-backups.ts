import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import cardsSchema from '../schema/cards';
const Cards = mongoose.model('Cards', cardsSchema);

const router = express.Router();

router.get('/api/backups', (req: Request, res: Response) => {
  Cards.find({})
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

export { router as getBackupsRouter }

