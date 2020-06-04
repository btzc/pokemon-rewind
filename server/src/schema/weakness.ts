import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let weaknessSchema = new Schema({
  type: {
    type: String
  },
  weakness: {
    type: String
  },
  value: {
    type: String
  }
});

export default weaknessSchema;
