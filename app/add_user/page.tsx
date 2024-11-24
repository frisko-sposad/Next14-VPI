'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://vpi-node-js.vercel.app/add_user`, {
        method: 'POST',
        headers: {
          // accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 64,
          login: 'new_user64',
          pass: 'new_user64',
          role: 'player',
          info: 'new_user64',
        }),
      });

      console.log({ response });

      const data = await response.json();
      setDataUsers(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex-col">
          <div>Игрок: {dataUsers[0] && dataUsers[0].login}</div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
