'use client';

export const feodsColumnsLabels = [
  {
    Header: 'ID феода',
    accessor: 'locations_id',
  },
  {
    Header: 'Феод',
    accessor: 'locations_name',
  },
  {
    Header: 'Шахты',
    columns: [
      {
        Header: 'Крестьяне',
        accessor: 'mines_peasent',
      },
      {
        Header: 'Рабы',
        accessor: 'mines_slave',
      },
      {
        Header: 'Лимит',
        accessor: 'mines_limits',
      },
    ],
  },
  {
    Header: 'Лес',
    columns: [
      {
        Header: 'Крестьяне',
        accessor: 'forest_peasent',
      },
      {
        Header: 'Рабы',
        accessor: 'forest_slave',
      },
      {
        Header: 'Лимит',
        accessor: 'forest_limits',
      },
    ],
  },
  {
    Header: 'Скот',
    columns: [
      {
        Header: 'Крестьяне',
        accessor: 'skins_peasent',
      },
      {
        Header: 'Рабы',
        accessor: 'skins_slave',
      },
      {
        Header: 'Лимит',
        accessor: 'skins_limits',
      },
    ],
  },
  {
    Header: 'Лошади',
    columns: [
      {
        Header: 'Крестьяне',
        accessor: 'horses_peasent',
      },
      {
        Header: 'Рабы',
        accessor: 'horses_slave',
      },
      {
        Header: 'Лимит',
        accessor: 'horses_limits',
      },
    ],
  },
  {
    Header: 'Снабжение',
    columns: [
      {
        Header: 'Крестьяне',
        accessor: 'food_peasent',
      },
      {
        Header: 'Рабы',
        accessor: 'food_slave',
      },
      {
        Header: 'Лимит',
        accessor: 'food_limits',
      },
    ],
  },
  {
    Header: 'Население(работают)',
    columns: [
      {
        Header: 'Крестьяне',
        accessor: 'population_work_peasent',
      },
      {
        Header: 'Рабы',
        accessor: 'population_work_slave',
      },
      {
        Header: 'Лимит',
        accessor: 'population_work_limits',
      },
    ],
  },
];
