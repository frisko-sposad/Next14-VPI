export interface Hero {
  id: number;
  heroName: string;
  attackBonus: number;
  healthBonus: number;
  moralityBonus: number;
  attackHorseman: number;
  attackSwordsman: number;
  attackSpearman: number;
  defenseHorseman: number;
  defenseSword: number;
  defenseSpear: number;
}

export const heroesData: Hero[] = [
  {
    id: 100,
    heroName: 'Командир',
    attackBonus: 0,
    healthBonus: 0,
    moralityBonus: 0,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1,
    defenseSpear: 1,
  },
  {
    id: 101,
    heroName: 'Робб Старк',
    attackBonus: 5,
    healthBonus: 5,
    moralityBonus: 10,
    attackHorseman: 1.1,
    attackSwordsman: 1.1,
    attackSpearman: 1.1,
    defenseHorseman: 1.1,
    defenseSword: 1.1,
    defenseSpear: 1.1,
  },
  {
    id: 102,
    heroName: 'Станнис Баратеон',
    attackBonus: 9,
    healthBonus: 6,
    moralityBonus: 11,
    attackHorseman: 1.1,
    attackSwordsman: 1.2,
    attackSpearman: 1.2,
    defenseHorseman: 1.2,
    defenseSword: 1.2,
    defenseSpear: 1.2,
  },
  {
    id: 103,
    heroName: 'Робар II Ройс',
    attackBonus: 7,
    healthBonus: 21,
    moralityBonus: 12,
    attackHorseman: 0,
    attackSwordsman: 0,
    attackSpearman: 0,
    defenseHorseman: 0,
    defenseSword: 0,
    defenseSpear: 0,
  },
  {
    id: 104,
    heroName: 'Гилвуд Хантер',
    attackBonus: 4,
    healthBonus: 1,
    moralityBonus: 13,
    attackHorseman: 0,
    attackSwordsman: 0,
    attackSpearman: 1.2,
    defenseHorseman: 0,
    defenseSword: 0,
    defenseSpear: 1.2,
  },
  {
    id: 105,
    heroName: 'Вардис Белмор',
    attackBonus: 2,
    healthBonus: 15,
    moralityBonus: 10,
    attackHorseman: 1.2,
    attackSwordsman: 0,
    attackSpearman: 0,
    defenseHorseman: 1.2,
    defenseSword: 0,
    defenseSpear: 0,
  },
  {
    id: 106,
    heroName: 'Гилвуд Хантер',
    attackBonus: 4,
    healthBonus: 1,
    moralityBonus: 10,
    attackHorseman: 0,
    attackSwordsman: 0,
    attackSpearman: 1.2,
    defenseHorseman: 0,
    defenseSword: 0,
    defenseSpear: 1.2,
  },
  {
    id: 107,
    heroName: 'Артис Аррен',
    attackBonus: 10,
    healthBonus: 15,
    moralityBonus: 10,
    attackHorseman: 1.1,
    attackSwordsman: 0,
    attackSpearman: 0,
    defenseHorseman: 0,
    defenseSword: 0,
    defenseSpear: 1.1,
  },
  {
    id: 108,
    heroName: 'Кайл Корбрей',
    attackBonus: 4,
    healthBonus: 6,
    moralityBonus: 10,
    attackHorseman: 0,
    attackSwordsman: 1.2,
    attackSpearman: 0,
    defenseHorseman: 0,
    defenseSword: 1.2,
    defenseSpear: 0,
  },
  {
    id: 109,
    heroName: 'Люцеон Теплтон',
    attackBonus: 4,
    healthBonus: 10,
    moralityBonus: 10,
    attackHorseman: 1.1,
    attackSwordsman: 1.1,
    attackSpearman: 1.1,
    defenseHorseman: 1.1,
    defenseSword: 1.1,
    defenseSpear: 1.1,
  },
  {
    id: 110,
    heroName: 'Гилвуд Хантер',
    attackBonus: 4,
    healthBonus: 1,
    moralityBonus: 10,
    attackHorseman: 0,
    attackSwordsman: 0,
    attackSpearman: 1.2,
    defenseHorseman: 0,
    defenseSword: 0,
    defenseSpear: 1.2,
  },
  {
    id: 111,
    heroName: 'Торгольд Толлетт',
    attackBonus: 5,
    healthBonus: 12,
    moralityBonus: 10,
    attackHorseman: 0,
    attackSwordsman: 0,
    attackSpearman: 1.1,
    defenseHorseman: 1.1,
    defenseSword: 1.1,
    defenseSpear: 0,
  },
];
