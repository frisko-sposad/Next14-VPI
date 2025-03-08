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
        <div className="flex-col p-2">
          <div>Отряды других игроков</div>
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
                key={'hero_nonUserSquad_name_title'}
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
              <th key={'number_title'} className=" border p-2 text-slate-500">
                Количество
              </th>
              <th
                key={'nonUserSquad.unit_price_title'}
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
                      squadArr[index].locations_id !=
                        squadArr[index - 1].locations_id)) && (
                    <tr>
                      <th
                        colSpan={4}
                        key={nonUserSquad.locations_name_subtitle + index}
                        className="border p-2 text-slate-500 text-center"
                      >
                        {nonUserSquad.locations_name}
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
                      key={'nonUserSquad.hero_name' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-40">{nonUserSquad.hero_name}</div>
                    </td>
                    <td
                      key={'nonUserSquad.unit_name' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-40">{nonUserSquad.unit_name}</div>
                    </td>
                    <td
                      key={'nonUserSquad.number' + index}
                      className="border p-2 text-slate-500 text-right"
                    >
                      <div className="w-20">
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
                      <div className="w-20">-</div>
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
