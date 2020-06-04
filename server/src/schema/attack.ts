import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let attackSchema = new Schema({
  cost: {
    type: Array
  },
  name: {
    type: String
  },
  text: {
    type: String
  },
  damage: {
    type: String
  },
  convertedEnergyCost: {
    type: Number
  }
});

export default attackSchema;

