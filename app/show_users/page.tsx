'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';
import { useRouter } from 'next/router';

const UserInfo = () => {
  const [dataUsers, setDataUsers] = useState([] as any);
  console.log(dataUsers);

  // const router = useRouter();
  // console.log(router.query.id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/users`, {
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
