'use client';
import { useState } from 'react';

type ID = null | string;

const UserDel = () => {
  const [responseText, setResponseText] = useState([] as any);
  const [id, setId] = useState<ID>(null);

  const postUser = async () => {
    const response = await fetch(
      // const response = await fetch(`http://localhost:5000/delete_users/${id}`, {
      `https://vpi-node-js.vercel.app/delete_users/${id}`,
      {
        method: 'DELETE',
        headers: {
          // accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
        }),
      }
    );

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
          <button
            onClick={postUser}
            className="ml-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete User
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

export default UserDel;
