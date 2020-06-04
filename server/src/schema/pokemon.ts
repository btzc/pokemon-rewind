import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let pokemonSchema = new Schema({
  cardsId: {
    type: Schema.Types.ObjectId,
  },
  id: {
    type: String
  },
  name: {
    type: String
  },
  nationalPokedexNumber: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  imageUrlHiRes: {
    type: String
  },
  types: {
    type: Array
  },
  supertype: {
    type: String
  },
  subtype: {
    type: String
  },
  evolvesFrom: {
    type: String
  },
  hp: {
    type: String
  },
  retreatCost: {
    type: Array
  },
  convertedRetreatCost: {
    type: Number
  },
  number: {
    type: String
  },
  rarity: {
    type: String
  },
  series: {
    type: String
  },
  set: {
    type: String
  },
  setCode: {
    type: String
  },
  attacks: {
    type: Array,
    ref: 'Attack'
  },
  weaknesses: {
    type: Array,
    ref: 'Weakness'
  }
});

export default pokemonSchema;
