'use client';
import Header from '@/components/Header/header';
import { useState } from 'react';

type ID = null | string;

const UserAdd = () => {
  const [responseText, setResponseText] = useState([] as any);
  const [id, setId] = useState<ID>(null);
  const [login, setLogin] = useState('');
  const [pageCode, setPageCode] = useState('player');

  const postUser = async () => {
    // const response = await fetch(`http://localhost:5000/add_user`, {
    const response = await fetch(`https://vpi-node-js.vercel.app/add_user`, {
      method: 'POST',
      headers: {
        // accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        login,
        page_code: pageCode,
      }),
    });

    console.log({ response });

    const data = await response.json();
    setResponseText(data);
  };

  return (
    <>
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
          <label className="flex justify-center shrink-0 m-2">Page_Code</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Page Code"
            type="text"
            placeholder="Page Code"
            onChange={(event) => setPageCode(event.target.value)}
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
        <div className="flex justify-center flex-nowrap">
          <label className="flex justify-center shrink-0 m-2">
            Ответ сервера: {responseText}
          </label>
        </div>
      </div>
    </>
  );
};

export default UserAdd;
