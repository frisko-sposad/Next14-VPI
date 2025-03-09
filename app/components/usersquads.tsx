'use client';
import { Fragment, useEffect, useState } from 'react';

const UserSquads = ({
  params,
  feodNumber,
}: {
  params: { id: number };
  feodNumber: Number;
}) => {
  const [allUserSquad, setAllUserSquad] = useState([] as any);
  const [feodSquad, setFeodSquad] = useState([] as any);

  useEffect(() => {
    let dataUserSquad = allUserSquad.filter(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    setFeodSquad(dataUserSquad);
  }, [allUserSquad, feodNumber]);

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

      setAllUserSquad(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center text-base text-slate-500 text-sm font-bold">
        <div className="flex-col p-2 text-base">
          <div>Отряды</div>
        </div>
      </div>
      <div className="flex justify-center text-sm">
        <table>
          <thead>
            <tr>
              <th
                key={'feodSquad_locations_id_title'}
                className=" border p-2 text-slate-500"
              >
                №
              </th>
              <th
                key={'feodSquad_hero_name_title'}
                className=" border p-2 text-slate-500"
              >
                Тип Юнита
              </th>
              <th
                key={'feodSquad_locations_army_number_title'}
                className=" border p-2 text-slate-500"
              >
                Количество
              </th>
              <th
                key={'feodSquad_unit_price_title'}
                className=" border p-2 text-slate-500"
              >
                Жалование
              </th>
            </tr>
          </thead>
          <tbody>
            {feodSquad.map((squad: any, index: any, squadArr: any) => (
              <Fragment key={squad + index}>
                {(index == 0 ||
                  (index != 0 &&
                    squadArr[index].hero_name !=
                      squadArr[index - 1].hero_name)) && (
                  <tr>
                    <th
                      colSpan={6}
                      key={squad.locations_name_subtitle + index}
                      className="border p-2 text-slate-500 text-center"
                    >
                      {squad.hero_name} ( {squad.house_name} )
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
                    key={'squad.unit_name' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-32">{squad.unit_name}</div>
                  </td>
                  <td
                    key={'squad.number' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-32">{squad.number}</div>
                  </td>
                  <td
                    key={'squad.unit_price' + index}
                    className="border p-2 text-slate-500 text-right"
                  >
                    <div className="w-32">
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
