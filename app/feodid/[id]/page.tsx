'use client';
import React, { useMemo } from 'react';
import { polygonsData } from '@/public/database/data-polygons';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = ({ params }: { params: { id: number } }) => {
  const dataFeods = useMemo(() => polygonsData, []);

  const data = dataFeods
    .filter((el) => el.id == params.id)
    .map((el) => {
      const res = {
        id: el.id,
        name: el.info.name,
        text: el.info.text,
        mines: el.info.resources.mines,
        forest: el.info.resources.forest,
        skins: el.info.resources.skins,
        horses: el.info.resources.horses,
        population: el.info.population,
        owner: el.info.owner,
        religion: el.info.religion,
        overlord: el.info.overlord,
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
        Header: 'Лимит ресурсов',
        columns: [
          {
            Header: 'Шахты',
            accessor: 'mines',
          },
          {
            Header: 'Лес',
            accessor: 'forest',
          },
          {
            Header: 'Скот',
            accessor: 'skins',
          },
          {
            Header: 'Лошади',
            accessor: 'horses',
          },
          {
            Header: 'Население',
            accessor: 'populationLimit',
          },
        ],
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
        Header: 'Сюзерен',
        accessor: 'overlord',
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
