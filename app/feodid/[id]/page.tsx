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
        minesPeasent: el.info.peasent.mines,
        forestPeasent: el.info.peasent.forest,
        skinsPeasent: el.info.peasent.skins,
        horsesPeasent: el.info.peasent.horses,
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
            accessor: 'minesPeasent',
          },
          {
            Header: 'Лес',
            accessor: 'forestPeasent',
          },
          {
            Header: 'Скот',
            accessor: 'skinsPeasent',
          },
          {
            Header: 'Лошади',
            accessor: 'horsesPeasent',
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
