'use client';
import Table from '@/components/Table/Table';
import { useEffect, useMemo, useState } from 'react';

const UsersInfo = () => {
  const [dataUsers, setDataUsers] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://vpi-node-js.vercel.app/users`, {
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
        Header: 'page_code',
        accessor: 'page_code',
      },
    ],
    []
  );

  return (
    <>
      <div className="flex justify-center">
        <div className="flex-col">
          <div className="pt-5">
            <Table columns={columnsUsers} data={dataUsers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersInfo;
