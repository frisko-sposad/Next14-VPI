'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';

type ID = null | string;

const UserInfo = ({ params }: { params: { locationsId: number } }) => {
  const [responseText, setResponseText] = useState([] as any);
  const [locationsId, setLocationsId] = useState(0);
  const [locationsName, setLocationsName] = useState('');
  const [locationsUserId, setLocationsUserId] = useState(2);

  const postUser = async () => {
    setResponseText('knopka_najata');
    const response = await fetch(`https://vpi-node-js.vercel.app/select`, {
      method: 'POST',
      headers: {
        // accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        locations_locationsId: locationsId,
        locations_name: locationsName,
        locations_user_locationsId: locationsUserId,
      }),
    });

    console.log({ response });

    const data = await response.json();
    setResponseText(data);
  };

  return (
    <>
      <Header />

      <div className="flex justify-center">
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">ID</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="locationsId"
            type="text"
            placeholder="locationsId"
            onChange={(event) => setLocationsId(Number(event.target.value))}
          />
        </div>
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">
            locationsName
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="locationsName"
            type="text"
            placeholder="locationsName"
            onChange={(event) => setLocationsName(event.target.value)}
          />
        </div>
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">
            locationsUserId
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="locationsUserId"
            type="number"
            placeholder="locationsUserId"
            onChange={(event) => setLocationsUserId(Number(event.target.value))}
          />
        </div>

        <div className="flex justify-center flex-nowrap">
          <button
            onClick={postUser}
            className="ml-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create feod
          </button>
        </div>
        <div>Ответ сервера: {responseText}</div>
      </div>
    </>
  );
};

export default UserInfo;
