'use client';
import { Fragment, useEffect, useState } from 'react';

const Garrison = ({ params }: { params: { id: number } }) => {
  const [userGarnisone, setUserGarnisone] = useState([] as any);

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
      <div className="flex justify-center text-base text-slate-500 text-sm font-bold">
        <div className="flex-col p-2">
          <div>Гарнизоны Феодов</div>
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
                key={'hero_garrison_name_title'}
                className=" border p-2 text-slate-500"
              >
                Командир
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
                key={'garrison.unit_price_title'}
                className=" border p-2 text-slate-500"
              >
                Жалование
              </th>
            </tr>
          </thead>
          <tbody>
            {userGarnisone.map((garrison: any, index: any, squadArr: any) => (
              <Fragment key={garrison + index}>
                {(index == 0 ||
                  (index != 0 &&
                    squadArr[index].locations_id !=
                      squadArr[index - 1].locations_id)) && (
                  <tr>
                    <th
                      colSpan={4}
                      key={garrison.locations_name_subtitle + index}
                      className="border p-2 text-slate-500 text-center"
                    >
                      {garrison.locations_name}
                    </th>
                  </tr>
                )}
                <tr key={'garrison' + index}>
                  <td
                    key={'garrison.locations_id' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-10">{garrison.locations_id}</div>
                  </td>

                  <td
                    key={'garrison.hero_name' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-40">{garrison.hero_name}</div>
                  </td>
                  <td
                    key={'garrison.unit_name' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-40">{garrison.unit_name}</div>
                  </td>
                  <td
                    key={'garrison.locations_army_number' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-20">{garrison.locations_army_number}</div>
                  </td>
                  <td
                    key={'garrison.unit_price' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-20">
                      {garrison.unit_price * garrison.locations_army_number}
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

export default Garrison;

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
