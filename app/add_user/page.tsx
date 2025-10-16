'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';

type ID = null | string;

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [responseText, setResponseText] = useState([] as any);
  const [id, setId] = useState<ID>(null);
  const [login, setLogin] = useState('');
  const [house, setHouse] = useState('player');

  const postUser = async () => {
    const response = await fetch(`https://vpi-node-js.vercel.app/add_user`, {
      method: 'POST',
      headers: {
        // accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        login,
        house,
      }),
    });

    console.log({ response });

    const data = await response.json();
    setResponseText(data);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`https://vpi-node-js.vercel.app/add_user`, {
  //       method: 'POST',
  //       headers: {
  //         // accept: 'application/json',
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         user_id: 68,
  //         login,
  //         pass: 'new_user66',
  //         house,
  //         info,
  //       }),
  //     });

  //     console.log({ response });

  //     const data = await response.json();
  //     setResponseText(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Header />

      <div className="flex justify-center">
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">user_id</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="id"
            type="text"
            placeholder="id"
            onChange={(event) => setId(event.target.value)}
          />
        </div>
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">Login</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="login"
            type="text"
            placeholder="login"
            onChange={(event) => setLogin(event.target.value)}
          />
        </div>
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">House</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="house"
            type="text"
            placeholder="player"
            onChange={(event) => setHouse(event.target.value)}
          />
        </div>
        <div className="flex justify-center flex-nowrap">
          <button
            onClick={postUser}
            className="ml-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create User
          </button>
        </div>
        <div>Ответ сервера: {responseText}</div>
      </div>
    </>
  );
};

export default UserInfo;
