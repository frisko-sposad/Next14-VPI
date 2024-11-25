'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';

type ID = null | string;

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [responseText, setResponseText] = useState([] as any);
  const [id, setId] = useState<ID>(null);
  const [login, setLogin] = useState('');
  const [role, setRole] = useState('player');
  const [info, setInfo] = useState('info');

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
        pass: 'new_user66',
        role,
        info,
      }),
    });

    console.log({ response });

    const data = await response.json();
    setResponseText(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://vpi-node-js.vercel.app/add_user`, {
        method: 'POST',
        headers: {
          // accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 68,
          login,
          pass: 'new_user66',
          role,
          info,
        }),
      });

      console.log({ response });

      const data = await response.json();
      setResponseText(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />

      <div className="flex justify-center">
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">ID</label>
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
          <label className="flex justify-center shrink-0 m-2">Role</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="login"
            type="text"
            placeholder="player"
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">Info</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="login"
            type="text"
            placeholder="info"
            onChange={(event) => setInfo(event.target.value)}
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
