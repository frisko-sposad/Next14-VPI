'use client';
import React, { useMemo } from 'react';
import { unitsData } from '@/public/database/units-data';
import { fortificationData } from '@/public/database/fortification-data';
import { heroesData } from '@/public/database/heroes-data';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataHeroes = useMemo(() => heroesData, []);

  const columnsHeroes = useMemo(
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
        Header: 'Командир',
        accessor: 'heroName',
      },

      {
        Header: 'Постоянный бонус',
        columns: [
          {
            Header: 'Атака',
            accessor: 'attackBonus',
          },
          {
            Header: 'Здоровье',
            accessor: 'healthBonus',
          },
          {
            Header: 'Мораль',
            accessor: 'moralityBonus',
          },
        ],
      },
      {
        Header: 'Бонус в Атаке по',
        columns: [
          {
            Header: 'Всадникам',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Мечниками',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Копейщикам',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Бонус в тылу от',
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
            <Table columns={columnsHeroes} data={dataHeroes} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
