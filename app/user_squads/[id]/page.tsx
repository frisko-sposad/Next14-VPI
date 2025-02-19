'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);
  const [userGarnisone, setUserGarnisone] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/user_squads/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();
      setDataUsers(data);
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/feods-army/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      setUserGarnisone(data);
    };
    fetchData();
  }, [params.id]);

  console.log({ userGarnisone });

  return (
    <>
      <Header />
      <div className="flex justify-center text-base text-slate-500">
        <div className="flex-col">
          <div>
            Игрок: {userGarnisone[0] && userGarnisone[0].login}, Гарнизоны
            Феодов
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm">
        <table>
          <thead>
            <tr>
              <th
                key={'locations_id_title'}
                className=" border p-2 text-slate-500"
              >
                Номер феода
              </th>
              <th
                key={'locations_title'}
                className=" border p-2 text-slate-500"
              >
                Название феода
              </th>
              <th
                key={'unit_name_title'}
                className=" border p-2 text-slate-500"
              >
                Тип Юнита
              </th>
              <th
                key={'locations_army_number_title'}
                className=" border p-2 text-slate-500"
              >
                Количество
              </th>
            </tr>
          </thead>
          <tbody>
            {userGarnisone.map((users: any, index: any) => (
              <tr key={users + index}>
                <td
                  key={users.locations_id}
                  className="border p-2 text-slate-500 text-right"
                >
                  <div className="w-10">{users.locations_id}</div>
                </td>
                <td
                  key={users.locations_name}
                  className="border p-2 text-slate-500 text-right"
                >
                  <div className="w-40">{users.locations_name}</div>
                </td>
                <td
                  key={users.unit_name}
                  className="border p-2 text-slate-500 text-right"
                >
                  <div className="w-40">{users.unit_name}</div>
                </td>
                <td
                  key={users.locations_army_number}
                  className="border p-2 text-slate-500 text-right"
                >
                  <div className="w-20">{users.locations_army_number}</div>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td
                key={'locations_id_title'}
                className="w-48 border p-2 text-slate-500 text-right"
              >
                {userGarnisone[0] && userGarnisone[0].locations_id}
              </td>
              <td
                key={'locations_title'}
                className="w-48 border p-2 text-slate-500 text-right"
              >
                {userGarnisone[0] && userGarnisone[0].locations_name}
              </td>
              <td
                key={'unit_name_title'}
                className="w-48 border p-2 text-slate-500 text-right"
              >
                {userGarnisone[0] && userGarnisone[0].unit_name}
              </td>
              <td
                key={'locations_army_number_title'}
                className="w-48 border p-2 text-slate-500 text-right"
              >
                {userGarnisone[0] && userGarnisone[0].locations_army_number}
              </td>
            </tr> */}
            {}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;

// C
// :
// 200
// locations_id
// :
// 1
// locations_name
// :
// "Винтерфелл"
// login
// :
// "Darian"
// unit_name
// :
// "Мечник"
// unit_price
// :
// 13
// user_id
// :
// 2
