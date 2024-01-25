'use client';
import React, { useMemo } from 'react';
import { unitsData } from '@/public/database/units-data';
import { fortificationData } from '@/public/database/fortification-data';
import { polygonsData } from '@/public/database/data-polygons';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataFeods = useMemo(() => polygonsData, []);

  const data = dataFeods.map((el) => {
    const res = {
      id: el.id,
      name: el.info.name,
      text: el.info.text,
      resources: el.info.resources,
      population: el.info.population,
      owner: el.info.owner,
      religion: el.info.religion,
    };
    return res;
  });

  const columnsHeroes = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Название',
        accessor: 'name',
      },
      {
        Header: 'Ресурсы',
        accessor: 'resources',
      },
      {
        Header: 'Население',
        accessor: 'population',
      },
      {
        Header: 'Религия',
        accessor: 'religion',
      },
      {
        Header: 'Описание',
        accessor: 'text',
      },
      {
        Header: 'Владелец',
        accessor: 'owner',
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
            <Table columns={columnsHeroes} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
