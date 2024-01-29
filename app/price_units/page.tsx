'use client';
import React, { useMemo } from 'react';
import { unitsData } from '@/public/database/units-data';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataUnits = useMemo(() => unitsData, []);

  const horseArmy = dataUnits[0].subRows;
  const footArmy = dataUnits[1].subRows;

  const columnsUnits = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Тип Юнита',
        accessor: 'name',
      },
      {
        Header: 'Железо',
        accessor: 'iron',
      },
      {
        Header: 'Дерево',
        accessor: 'tree',
      },
      {
        Header: 'Кожа',
        accessor: 'skins',
      },
      {
        Header: 'Лошадь',
        accessor: 'horses',
      },

      {
        Header: 'Жалование(в ход)',
        accessor: 'price',
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
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
