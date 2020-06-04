import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let cardsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String
  },
  date: {
    type: Date
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Pokemon'
  }]
});

export default cardsSchema;
