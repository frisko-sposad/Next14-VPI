'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/feods/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      const dataFeod = data.map(
        (el: {
          mines_peasent: any;
          forest_peasent: any;
          skins_peasent: any;
          horses_peasent: any;
          food_peasent: any;
          mines_slave: any;
          forest_slave: any;
          skins_slave: any;
          horses_slave: any;
          food_slave: any;
          mines_limits: any;
          forest_limits: any;
          skins_limits: any;
          horses_limits: any;
          food_limits: any;
          login: any;
        }) => {
          const population_Peasent =
            el.mines_peasent +
            el.forest_peasent +
            el.skins_peasent +
            el.horses_peasent +
            el.food_peasent;
          const population_Slave =
            el.mines_slave +
            el.forest_slave +
            el.skins_slave +
            el.horses_slave +
            el.food_slave;
          const population_Limits =
            el.mines_limits +
            el.forest_limits +
            el.skins_limits +
            el.horses_limits +
            el.food_limits;
          const login = el.login;

          const res = {
            ...el,
            population_Peasent:
              el.mines_peasent +
              el.forest_peasent +
              el.skins_peasent +
              el.horses_peasent +
              el.food_peasent,
            population_Slave:
              el.mines_slave +
              el.forest_slave +
              el.skins_slave +
              el.horses_slave +
              el.food_slave,
            population_Limits:
              el.mines_limits +
              el.forest_limits +
              el.skins_limits +
              el.horses_limits +
              el.food_limits,
            login,
          };

          return res;
        }
      );

      console.log({ dataFeod });
      setDataUsers(dataFeod);
    };
    fetchData();
  }, [params.id]);

  const columnsUsers = useMemo(
    () => [
      {
        Header: 'ID феода',
        accessor: 'locations_id',
      },
      {
        Header: 'Феод',
        accessor: 'locations_name',
      },
      {
        Header: 'Шахты',
        columns: [
          {
            Header: 'Крестьяне',
            accessor: 'mines_peasent',
          },
          {
            Header: 'Рабы',
            accessor: 'mines_slave',
          },
          {
            Header: 'Лимит',
            accessor: 'mines_limits',
          },
        ],
      },
      {
        Header: 'Лес',
        columns: [
          {
            Header: 'Крестьяне',
            accessor: 'forest_peasent',
          },
          {
            Header: 'Рабы',
            accessor: 'forest_slave',
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
            Header: 'Крестьяне',
            accessor: 'skins_peasent',
          },
          {
            Header: 'Рабы',
            accessor: 'skins_slave',
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
            Header: 'Крестьяне',
            accessor: 'horses_peasent',
          },
          {
            Header: 'Рабы',
            accessor: 'horses_slave',
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
            Header: 'Крестьяне',
            accessor: 'food_peasent',
          },
          {
            Header: 'Рабы',
            accessor: 'food_slave',
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
            Header: 'Крестьяне',
            accessor: 'population_Peasent',
          },
          {
            Header: 'Рабы',
            accessor: 'population_Slave',
          },
          {
            Header: 'Лимит',
            accessor: 'population_Limits',
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
          <div>Игрок: {dataUsers[0] && dataUsers[0].login}</div>
          <div className="pt-5">
            <Table columns={columnsUsers} data={dataUsers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
