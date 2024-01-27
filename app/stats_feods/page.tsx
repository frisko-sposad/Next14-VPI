'use client';
import React, { useMemo } from 'react';
import { polygonsData } from '@/public/database/data-polygons';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataFeods = useMemo(() => polygonsData, []);

  const data = dataFeods.map((el) => {
    const populationLimit =
      el.info.resources.mines +
      el.info.resources.forest +
      el.info.resources.skins +
      el.info.resources.horses;
    const res = {
      id: el.id,
      name: el.info.name,
      text: el.info.text,
      mines: `${el.info.resources.mines}/${el.info.limits.mines}`,
      forest: `${el.info.resources.forest}/${el.info.limits.forest}`,
      skins: `${el.info.resources.skins}/${el.info.limits.skins}`,
      horses: `${el.info.resources.horses}/${el.info.limits.horses}`,
      food: `${el.info.resources.food}/${el.info.limits.food}`,
      owner: el.info.owner,
      religion: el.info.religion,
      populationLimit: `${
        el.info.resources.mines +
        el.info.resources.forest +
        el.info.resources.skins +
        el.info.resources.horses +
        el.info.resources.food
      }/${
        el.info.limits.mines +
        el.info.limits.forest +
        el.info.limits.skins +
        el.info.limits.horses +
        el.info.limits.food
      }`,
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
        Header: 'Работают / Лимит ресурсов',
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
            Header: 'Снабжение',
            accessor: 'food',
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
