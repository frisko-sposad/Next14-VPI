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
        Header: 'attackBonus',
        accessor: 'attackBonus',
      },
      {
        Header: 'healthBonus',
        accessor: 'healthBonus',
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
            <Table columns={columnsFortification} data={dataFortification} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
