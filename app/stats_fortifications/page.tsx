'use client';
import React, { useMemo } from 'react';
import { unitsData } from '@/public/database/units-data';
import { fortificationData } from '@/public/database/fortification-data';
import { heroesData } from '@/public/database/heroes-data';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataFortification = useMemo(() => fortificationData, []);

  const columnsFortification = useMemo(
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
        Header: 'Укрепления',
        accessor: 'fortificationName',
      },
      {
        Header: 'Бонус Атаки',
        accessor: 'attackBonus',
      },
      // {
      //   Header: 'Бонус ХП',
      //   accessor: 'healthBonus',
      // },
      {
        Header: 'Мораль',
        accessor: 'moralityBonus',
      },
      // {
      //   Header: 'Бонус в Атаке по',
      //   columns: [
      //     {
      //       Header: 'Всадникам',
      //       accessor: 'attackHorseman',
      //     },
      //     {
      //       Header: 'Мечниками',
      //       accessor: 'attackSwordsman',
      //     },
      //     {
      //       Header: 'Копейщикам',
      //       accessor: 'attackSpearman',
      //     },
      //   ],
      // },
      {
        Header: 'Бонус в тылу по',
        columns: [
          // {
          //   Header: 'Всадникам',
          //   accessor: 'defenseHorseman',
          // },
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
      {
        Header: 'Экономические бонусы',
        columns: [
          {
            Header: 'Налоги',
            accessor: 'bonusTaxes',
          },
          {
            Header: 'Рост Населения',
            accessor: 'bonusPopulation',
          },
          {
            Header: 'Добыча рабами',
            accessor: 'bonusSlave',
          },
        ],
      },
      {
        Header: 'Цена постройки',
        columns: [
          {
            Header: 'Дерево',
            accessor: 'tree',
          },
          {
            Header: 'Серебро',
            accessor: 'price',
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
            <Table columns={columnsFortification} data={dataFortification} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
