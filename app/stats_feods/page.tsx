'use client';
import React, { useMemo } from 'react';
import { polygonsData } from '@/public/database/data-polygons';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataFeods = useMemo(() => polygonsData, []);

  const data = dataFeods.map((el) => {
    const population =
      el.info.resources.mines +
      el.info.resources.forest +
      el.info.resources.skins +
      el.info.resources.horses +
      el.info.resources.food;
    const populationLimit =
      el.info.limits.mines +
      el.info.limits.forest +
      el.info.limits.skins +
      el.info.limits.horses +
      el.info.limits.food;

    const res = {
      id: el.id,
      name: el.info.name,
      text: el.info.text,
      // mines: `${el.info.resources.mines}/${el.info.limits.mines}`,
      // forest: `${el.info.resources.forest}/${el.info.limits.forest}`,
      // skins: `${el.info.resources.skins}/${el.info.limits.skins}`,
      // horses: `${el.info.resources.horses}/${el.info.limits.horses}`,
      // food: `${el.info.resources.food}/${el.info.limits.food}`,
      mines_resources: el.info.resources.mines,
      mines_limits: el.info.limits.mines,
      forest_resources: el.info.resources.forest,
      forest_limits: el.info.limits.forest,
      skins_resources: el.info.resources.skins,
      skins_limits: el.info.limits.skins,
      horses_resources: el.info.resources.horses,
      horses_limits: el.info.limits.horses,
      food_resources: el.info.resources.food,
      food_limits: el.info.limits.food,
      owner: el.info.owner,
      religion: el.info.religion,
      // populationLimit: `${population}/${populationLimit}`,
      population,
      populationLimit,
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
        Header: 'Лес',
        columns: [
          {
            Header: 'Рабочие',
            accessor: 'forest_resources',
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
            Header: 'Рабочие',
            accessor: 'skins_resources',
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
            Header: 'Рабочие',
            accessor: 'horses_resources',
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
            Header: 'Рабочие',
            accessor: 'food_resources',
          },
          {
            Header: 'Лимит',
            accessor: 'food_limits',
          },
        ],
      },
      {
        Header: 'Население',
        columns: [
          {
            Header: 'Рабочие',
            accessor: 'population',
          },
          {
            Header: 'Лимит',
            accessor: 'populationLimit',
          },
        ],
      },
      // {
      //   Header: 'Работают / Лимит ресурсов',
      //   columns: [
      //     {
      //       Header: 'Шахты',
      //       accessor: 'mines',
      //     },
      //     {
      //       Header: 'Лес',
      //       accessor: 'forest',
      //     },
      //     {
      //       Header: 'Скот',
      //       accessor: 'skins',
      //     },
      //     {
      //       Header: 'Лошади',
      //       accessor: 'horses',
      //     },
      //     {
      //       Header: 'Снабжение',
      //       accessor: 'food',
      //     },
      //     {
      //       Header: 'Население',
      //       accessor: 'populationLimit',
      //     },
      //   ],
      // },

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
