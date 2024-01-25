'use client';
import React, { useMemo } from 'react';
import { unitsData } from '@/public/database/units-data';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataUnits = useMemo(() => unitsData, []);

  const horseArmy = dataUnits[0].subRows;
  const footArmy = dataUnits[1].subRows;
  const shipArmy = dataUnits[2].subRows;

  const columnsUnits = useMemo(
    () => [
      {
        id: 'expander',
        Header: '',
        Cell: ({ row }: any) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? '-' : '+'}
            </span>
          ) : null,
      },
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Тип Юнита',
        accessor: 'name',
      },
      {
        Header: 'Оружие',
        accessor: 'weapon',
      },
      {
        Header: 'Атака',
        accessor: 'attack',
      },
      {
        Header: 'Дальняя атака',
        accessor: 'distanceAttack',
      },
      {
        Header: 'Здоровье',
        accessor: 'health',
      },
      {
        Header: 'Мораль',
        accessor: 'morality',
      },
      {
        Header: 'Размер(Вес)',
        accessor: 'size',
      },
      {
        Header: 'Жалование(в ход)',
        accessor: 'price',
      },
      {
        Header: 'Бонус в Атаке по',
        columns: [
          {
            Header: 'Всадникам',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Мечникам',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Копейщикам',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Бонус в Тылу от',
        columns: [
          {
            Header: 'Всадников',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'Мечников',
            accessor: 'defenseSword',
          },
          {
            Header: 'Копейщиков',
            accessor: 'defenseSpear',
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex-col">
          <div className="pt-5">
            <Table columns={columnsUnits} data={horseArmy} />
            <br />
            <Table columns={columnsUnits} data={footArmy} />
            <br />
            <Table columns={columnsUnits} data={shipArmy} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
