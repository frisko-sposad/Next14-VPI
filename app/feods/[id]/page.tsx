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

      console.log(response);

      const data = await response.json();
      setDataUsers(data);
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
            <select name="ids" id="ids">
              <option value="1">Id 1</option>
              <option value="2">Id 2</option>
              <option value="3">Id 3</option>
              <option value="41">Id 41</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
