'use client';
import React, { useMemo } from 'react';
import { unitsData } from '@/public/database/units-data';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataUnits = useMemo(() => unitsData, []);

  const horseArmy = dataUnits[0].subRows.slice(1);
  const footArmy = dataUnits[1].subRows;
  const shipArmy = dataUnits[2].subRows;

  const columnsUnits = useMemo(
    () => [
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
        Header: 'Бонус в Тылу по',
        columns: [
          {
            Header: 'Всадникам',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'Мечникам',
            accessor: 'defenseSword',
          },
          {
            Header: 'Копейщикам',
            accessor: 'defenseSpear',
          },
        ],
      },
    ],
    [],
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
            {/* <Table columns={columnsUnits} data={shipArmy} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
