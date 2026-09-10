'use client';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';
import { useEffect, useMemo, useState } from 'react';
import host_api from '../host_api';

const UsersInfo = () => {
  const [dataUsers, setDataUsers] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host_api}/users`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      console.log(response);

      const data = await response.json();
      data && setDataUsers(data);
    };
    fetchData();
  }, []);

  const columnsUsers = useMemo(
    () => [
      {
        Header: ' id',
        accessor: 'user_id',
      },
      {
        Header: 'login',
        accessor: 'login',
      },
      {
        Header: 'role',
        accessor: 'role',
      },
      {
        Header: 'info',
        accessor: 'info',
      },
    ],
    []
  );

  return (
    <>
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

export default UsersInfo;
