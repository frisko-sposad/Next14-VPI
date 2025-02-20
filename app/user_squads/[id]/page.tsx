'use client';
import Header from '@/components/Header/header';
import { useEffect, useState } from 'react';

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

  return (
    <>
      <Header />
      <div className="flex justify-center text-base text-slate-500 text-sm font-bold">
        <div className="flex-col p-2">
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
                №
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
              <th
                key={'squad.unit_price_title'}
                className=" border p-2 text-slate-500"
              >
                Жалование
              </th>
            </tr>
          </thead>
          <tbody>
            {userGarnisone.map((squad: any, index: any, squadArr: any) => (
              <>
                {(index == 0 ||
                  (index != 0 &&
                    squadArr[index].locations_id !=
                      squadArr[index - 1].locations_id)) && (
                  <tr>
                    <th
                      colSpan={4}
                      key={'squad.locations_name_subtitle' + index}
                      className="border p-2 text-slate-500 text-center"
                    >
                      {squad.locations_name}
                    </th>
                  </tr>
                )}
                <tr key={'squad' + index}>
                  <td
                    key={'squad.locations_id' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-10">{squad.locations_id}</div>
                  </td>

                  <td
                    key={'squad.unit_name' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-40">{squad.unit_name}</div>
                  </td>
                  <td
                    key={'squad.locations_army_number' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-20">{squad.locations_army_number}</div>
                  </td>
                  <td
                    key={'squad.unit_price' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-20">
                      {squad.unit_price * squad.locations_army_number}
                    </div>
                  </td>
                </tr>
              </>
            ))}
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
