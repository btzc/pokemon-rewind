import express from 'express';
import { json } from 'body-parser';

import cors from 'cors';
import mongoose from 'mongoose';

import { getBackupsRouter } from './routes/get-backups';
import { createBackupsRouter } from './routes/create-backups';
import { searchBackupRouter } from './routes/search-backup';
import { getBackupRouter } from './routes/get-backup';
import { deleteBackupRouter } from './routes/delete-backup';

const app = express();
app.use(json());
app.use(cors());
app.use(getBackupsRouter);
app.use(createBackupsRouter);
app.use(searchBackupRouter);
app.use(getBackupRouter);
app.use(deleteBackupRouter);

app.listen(4000, () => {
  console.log('Listening on port 4000');

  mongoose.connect('mongodb://mongo:27017/pokemon', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is now connected'))
    .catch((err: Error) => console.log(err));
});
