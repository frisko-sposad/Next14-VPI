'use client';
import Table from '@/components/Table/Table';
import { useEffect, useMemo, useState } from 'react';
import host_api from '../host_api';

const UserInfo = ({ params }: { params: { userId: Number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host_api}/show_users/${params.userId}`, {
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
  }, [params.userId]);

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

export default UserInfo;
