export interface Fortification {
  id: number;
  fortificationName: string;
  attackBonus: number;
  healthBonus: number;
  moralityBonus: number;
  attackHorseman: number;
  attackSwordsman: number;
  attackSpearman: number;
  defenseHorseman: number;
  defenseSword: number;
  defenseSpear: number;
  bonusTaxes: number;
  bonusPopulation: number;
  bonusSlave: number;
  price: number;
  tree: number;
}

export const fortificationData: Fortification[] = [
  {
    id: 1000,
    fortificationName: 'Без укреплений',
    attackBonus: 0,
    healthBonus: 0,
    moralityBonus: 0,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1,
    defenseSpear: 1,
    bonusTaxes: 0,
    bonusPopulation: 0,
    bonusSlave: 0,
    price: 0,
    tree: 0,
  },
  // {
  //   id: 1001,
  //   fortificationName: 'Барикады из повозок',
  //   attackBonus: 0,
  //   healthBonus: 3,
  //   moralityBonus: 0,
  //   attackHorseman: 1,
  //   attackSwordsman: 1,
  //   attackSpearman: 1,
  //   defenseHorseman: 1.1,
  //   defenseSword: 1.1,
  //   defenseSpear: 1.1,
  // bonusTaxes: 1,
  // bonusPopulation: 1,
  // bonusSlave: 1,
  // price:
  // tree
  // },

  {
    id: 1002,
    fortificationName: 'Частокол',
    attackBonus: 0,
    healthBonus: 5,
    moralityBonus: 2,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1.2,
    defenseSpear: 1.2,
    bonusTaxes: 1,
    bonusPopulation: 1,
    bonusSlave: 0.25,
    price: 2500,
    tree: 500,
  },
  {
    id: 1003,
    fortificationName: 'Каменная стена 1 ур',
    attackBonus: 3,
    healthBonus: 10,
    moralityBonus: 4,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1.3,
    defenseSpear: 1.3,
    bonusTaxes: 2,
    bonusPopulation: 2,
    bonusSlave: 0.5,
    price: 5000,
    tree: 1000,
  },
  {
    id: 1004,
    fortificationName: 'Каменная стена 2 ур',
    attackBonus: 6,
    healthBonus: 15,
    moralityBonus: 6,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1.4,
    defenseSpear: 1.4,
    bonusTaxes: 3,
    bonusPopulation: 3,
    bonusSlave: 0.75,
    price: 10000,
    tree: 2500,
  },
  {
    id: 1005,
    fortificationName: 'Каменная стена 3 ур',
    attackBonus: 9,
    healthBonus: 20,
    moralityBonus: 8,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1.5,
    defenseSpear: 1.5,
    bonusTaxes: 4,
    bonusPopulation: 4,
    bonusSlave: 1,
    price: 12000,
    tree: 4000,
  },
  // {
  //   id: 1100,
  //   fortificationName: 'Равнина',
  //   attackBonus: 0,
  //   healthBonus: 0,
  //   moralityBonus: 0,
  //   attackHorseman: 1.1,
  //   attackSwordsman: 1,
  //   attackSpearman: 1,
  //   defenseHorseman: 1.1,
  //   defenseSword: 1,
  //   defenseSpear: 1,
  // bonusTaxes: 1,
  // bonusPopulation: 1,
  // bonusSlave: 1,
  // price:
  // tree
  // },
  // {
  //   id: 1101,
  //   fortificationName: 'Лес',
  //   attackBonus: 0,
  //   healthBonus: 0,
  //   moralityBonus: 0,
  //   attackHorseman: 0.5,
  //   attackSwordsman: 1,
  //   attackSpearman: 0.5,
  //   defenseHorseman: 1,
  //   defenseSword: 1,
  //   defenseSpear: 1,
  // bonusTaxes: 1,
  // bonusPopulation: 1,
  // bonusSlave: 1,
  // price:
  // tree
  // },
  // {
  //   id: 1102,
  //   fortificationName: 'Болото',
  //   attackBonus: 0.5,
  //   healthBonus: 0.5,
  //   moralityBonus: 0,
  //   attackHorseman: 0.5,
  //   attackSwordsman: 0.5,
  //   attackSpearman: 0.5,
  //   defenseHorseman: 0.5,
  //   defenseSword: 0.5,
  //   defenseSpear: 0.5,
  // bonusTaxes: 1,
  // bonusPopulation: 1,
  // bonusSlave: 1,
  // price:
  // tree
  // // },
  // {
  //   id: 1103,
  //   fortificationName: 'Горы',
  //   attackBonus: 0,
  //   healthBonus: 0,
  //   moralityBonus: 0,
  //   attackHorseman: 0.5,
  //   attackSwordsman: 1,
  //   attackSpearman: 1,
  //   defenseHorseman: 1,
  //   defenseSword: 1,
  //   defenseSpear: 1,
  // bonusTaxes: 1,
  // bonusPopulation: 1,
  // bonusSlave: 1,
  // price:
  // tree
  // },
];
