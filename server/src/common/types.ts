export interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface Attacks {
  attacks: Attack[];
}

export interface Weakness {
  type: string;
  weakness: string;
  value: string;
}

export interface Weaknesses {
  weaknesses: Weakness[];
}

export interface Pokemon {
  cardsId: string;
  id: string;
  name: string;
  nationalPokedexNumber: Number;
  imageUrl: string;
  imageUrlHiRes: string;
  types: string[];
  supertype: string;
  subtype: string;
  evolvesFrom: string;
  hp: string;
  retreatCost: string[];
  convertedRetreatCost: number;
  number: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  attacks: Attacks;
  weaknesses: Weaknesses;
}

export interface Cards {
  _id: string
  name: string;
  date: Date;
  cards: string[];
}
