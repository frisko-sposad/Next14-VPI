'use client';
import { Fragment, useEffect, useState } from 'react';

const UserSquads = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/units_squad/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log({ data });

      setDataUsers(data);
    };
    fetchData();
  }, [params.id]);
  console.log({ dataUsers });

  return (
    <>
      <div className="flex justify-center text-base text-slate-500 text-sm font-bold">
        <div className="flex-col p-2">
          <div>Отряды</div>
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
                Командир
              </th>
              <th
                key={'hero_name_title'}
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
            {dataUsers.map((squad: any, index: any, squadArr: any) => (
              <Fragment key={squad + index}>
                {(index == 0 ||
                  (index != 0 &&
                    squadArr[index].locations_id !=
                      squadArr[index - 1].locations_id)) && (
                  <tr>
                    <th
                      colSpan={4}
                      key={squad.locations_name_subtitle + index}
                      className="border p-2 text-slate-500 text-center"
                    >
                      {squad.locations_name}
                    </th>
                  </tr>
                )}
                <tr>
                  <td
                    key={'squad.locations_id' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-10">{squad.locations_id}</div>
                  </td>

                  <td
                    key={'squad.hero_name' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-40">{squad.hero_name}</div>
                  </td>
                  <td
                    key={'squad.unit_name' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-40">{squad.unit_name}</div>
                  </td>
                  <td
                    key={'squad.number' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-20">{squad.number}</div>
                  </td>
                  <td
                    key={'squad.unit_price' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-20">
                      {squad.unit_price * squad.number}
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserSquads;
