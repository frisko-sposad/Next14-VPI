'use client';
import { Fragment, useEffect, useState } from 'react';

const FeodNonUserSquad = ({
  params,
  feodNumber,
}: {
  params: { id: number };
  feodNumber: Number;
}) => {
  const [allNonUserSquads, setAllNonUserSquads] = useState([] as any);
  const [nonUserSquads, setUserNonUserSquads] = useState([] as any);
  console.log({ nonUserSquads });

  useEffect(() => {
    let dataUserNonUserSquad = allNonUserSquads.filter(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    setUserNonUserSquads(dataUserNonUserSquad);
  }, [allNonUserSquads, feodNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/units_non_user_squad/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      setAllNonUserSquads(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center text-base text-slate-500 text-sm font-bold">
        <div className="flex-col p-2 text-base">
          <div>Отряды других игроков</div>
        </div>
      </div>
      <div className="flex justify-center text-sm">
        <table>
          <thead>
            <tr>
              <th
                key={'nonUserSquad_locations_id_title'}
                className=" border p-2 text-slate-500"
              >
                №
              </th>
              <th
                key={'nonUserSquad_unit_name_title'}
                className=" border p-2 text-slate-500"
              >
                Тип Юнита
              </th>
              <th
                key={'nonUserSquad_number_title'}
                className=" border p-2 text-slate-500"
              >
                Количество
              </th>
              <th
                key={'nonUserSquad_unit_price_title'}
                className=" border p-2 text-slate-500"
              >
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {nonUserSquads.map(
              (nonUserSquad: any, index: any, squadArr: any) => (
                <Fragment key={nonUserSquad + index}>
                  {(index == 0 ||
                    (index != 0 &&
                      squadArr[index].hero_name !=
                        squadArr[index - 1].hero_name)) && (
                    <tr>
                      <th
                        colSpan={6}
                        key={nonUserSquad.locations_name_subtitle + index}
                        className="border p-2 text-slate-500 text-center"
                      >
                        {nonUserSquad.hero_name} ( {nonUserSquad.house_name} )
                      </th>
                    </tr>
                  )}
                  <tr key={'nonUserSquad' + index}>
                    <td
                      key={'nonUserSquad.locations_id' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-10">{nonUserSquad.locations_id}</div>
                    </td>
                    <td
                      key={'nonUserSquad.unit_name' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-32">{nonUserSquad.unit_name}</div>
                    </td>
                    <td
                      key={'nonUserSquad.number' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-32">
                        {nonUserSquad.number <= 100 && '0 - 100'}
                        {nonUserSquad.number > 100 &&
                          nonUserSquad.number <= 500 &&
                          '101 - 500'}
                        {nonUserSquad.number >= 500 && '501 - ???'}
                      </div>
                    </td>
                    <td
                      key={'nonUserSquad.unit_price' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-32">-</div>
                    </td>
                  </tr>
                </Fragment>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeodNonUserSquad;
