'use client';
import { Fragment, useEffect, useState } from 'react';

const tableTitle = [
  'Место работы',
  'Крестьяне',
  'Рабы',
  'Лимит',
  'Добыча ресурсов',
  'Тип Ресурса',
];

const tableInfoHeader = [
  {
    workplace: 'Шахты',
    type: 'металла',
    resourseNumber: ['mines_peasent', 'mines_slave', 'mines_limits'],
  },
  {
    workplace: 'Лес',
    type: 'древесина',
    resourseNumber: ['forest_peasent', 'forest_slave', 'forest_limits'],
  },
  {
    workplace: 'Свинарник',
    type: 'шкур/еды',
    resourseNumber: ['skins_peasent', 'skins_slave', 'skins_limits'],
  },
  {
    workplace: 'Конюшни',
    type: 'лошадей',
    resourseNumber: ['horses_peasent', 'horses_slave', 'horses_limits'],
  },
  {
    workplace: 'Ферма',
    type: 'еды',
    resourseNumber: ['food_peasent', 'food_slave', 'food_limits'],
  },
];

const FeodWorker = ({
  params,
  feodNumber,
}: {
  params: { id: number };
  feodNumber: Number;
}) => {
  const [allWorkers, setAllWorkers] = useState([] as any);
  const [feodWorkers, setFeodWorkers] = useState([] as any);
  console.log({ feodWorkers });

  useEffect(() => {
    let dataFeodWorkers = allWorkers.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    setFeodWorkers({ ...dataFeodWorkers });
  }, [allWorkers, feodNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/feods-info-worker/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      setAllWorkers(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center text-sm text-slate-500">
        <table>
          <thead>
            <tr>
              <th
                key={feodWorkers && feodWorkers.locations_name}
                colSpan={10}
                className="w-28  p-2"
              >
                Распределение рабочих
              </th>
            </tr>
          </thead>
          <tbody className="border p-2">
            <tr>
              {tableTitle.map((tableTitleEl: any) => (
                <Fragment key={tableTitleEl}>
                  <th
                    key={tableTitleEl + 'th'}
                    colSpan={1}
                    className="w-28 border p-2"
                  >
                    {tableTitleEl}
                  </th>
                </Fragment>
              ))}
            </tr>
            {tableInfoHeader.map((tableInfoHeaderEl: any) => (
              <Fragment key={tableInfoHeaderEl.workplace + 'Fragment'}>
                <tr key={tableInfoHeaderEl.workplace + 'tr'}>
                  {/* место работы */}
                  <td
                    key={tableInfoHeaderEl.workplace}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                  >
                    {tableInfoHeaderEl.workplace}
                  </td>
                  {/* сколько крестьян */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'peasent'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                  >
                    {feodWorkers &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[0]]}
                  </td>
                  {/* сколько рабов */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'slave'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                  >
                    {feodWorkers &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[1]]}
                  </td>
                  {/* лимит */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'limits'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                    title="Работает крестьян и рабов / максимальный лимит"
                  >
                    {feodWorkers &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[0]] &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[0]] +
                        feodWorkers[tableInfoHeaderEl.resourseNumber[1]]}
                    /
                    {feodWorkers &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[2]]}
                  </td>
                  {/* Добыча ресурсов */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'resource_production'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                    title="Крестьяне добывают 1 ресурс, рабы 2 ресурса"
                  >
                    {feodWorkers &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[0]] &&
                      feodWorkers[tableInfoHeaderEl.resourseNumber[0]] +
                        feodWorkers[tableInfoHeaderEl.resourseNumber[1]] * 2}
                  </td>
                  {/* Тип ресурсов */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'resource_type'}
                    colSpan={1}
                    className="w-28 border p-2 text-left"
                    title="Крестьяне добывают 1 ресурс, рабы 2 ресурса"
                  >
                    {tableInfoHeaderEl.type}
                  </td>
                </tr>
              </Fragment>
            ))}
            <tr>
              <td></td>
            </tr>
            {/* Незанятые рабочие */}
            <tr>
              <td
                key={'Незанятые'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                Незанятые
              </td>
              <td
                key={'Незанятые Крестьяне'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {feodWorkers && feodWorkers.unused_peasents}
              </td>
              <td
                key={'Незанятые Рабы'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {feodWorkers && feodWorkers.unused_slaves}
              </td>
              <td className="w-28 border p-2 text-right">-</td>
              <td className="w-28 border p-2 text-right">-</td>
              <td className="w-28 border p-2 text-right">-</td>
            </tr>
            {/* Всего рабочих */}
            <tr>
              <td
                key={'Незанятые'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                Всего
              </td>
              <td
                key={'Незанятые Крестьяне'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {feodWorkers &&
                  feodWorkers.work_peasent &&
                  feodWorkers.work_peasent + feodWorkers.unused_peasents}
              </td>
              <td
                key={'Всего крестьян'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {feodWorkers &&
                  feodWorkers.work_slave &&
                  feodWorkers.work_slave + feodWorkers.unused_slaves}
              </td>
              <td
                key={'Общий лимит'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {feodWorkers &&
                  feodWorkers.work_slave &&
                  feodWorkers.work_slave + feodWorkers.unused_slaves}{' '}
                / {feodWorkers && feodWorkers.work_limits}
              </td>
              <td className="w-28 border p-2 text-right">-</td>
              <td className="w-28 border p-2 text-right">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeodWorker;
