'use client';
import Header from '@/components/Header/header';
import { Fragment, useCallback, useEffect, useState } from 'react';

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

const tableTitle = [
  'Место работы',
  'Крестьяне',
  'Рабы',
  'Лимит',
  'Добыча ресурсов',
  'Тип Ресурса',
];

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [feodInfo, setFeodInfo] = useState([] as any);
  const [feodInfoResources, setFeodInfoResources] = useState([] as any);
  const [feodArmyPrice, setFeodArmyPrice] = useState([] as any);
  const [feodNumber, setFeodNumber] = useState(1);
  const [currentFeod, setCurrentFeod] = useState({} as any);

  // проверяем выбранный феод и записываем в feoInfo данные по выбранному феоду
  useEffect(() => {
    let dataFeod = feodInfo.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    let dataFeodResources = feodInfoResources.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    let dataFeodArmyPrice = feodArmyPrice.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    setCurrentFeod({ ...dataFeod, ...dataFeodResources, ...dataFeodArmyPrice });
  }, [feodArmyPrice, feodInfo, feodInfoResources, feodNumber]);

  const fetchDataFeodInfo = useCallback(async () => {
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
    console.log({ data });
    setFeodInfo(data);
    setFeodNumber(data && data[0].locations_id);
  }, [params.id]);

  useEffect(() => {
    fetchDataFeodInfo();
  }, [fetchDataFeodInfo, params.id]);

  const fetchDataFeodsResources = useCallback(async () => {
    const response = await fetch(
      `https://vpi-node-js.vercel.app/feods-resources/${params.id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    const data = await response.json();

    setFeodInfoResources(data);
  }, [params.id]);

  useEffect(() => {
    fetchDataFeodsResources();
  }, [fetchDataFeodsResources, params.id]);

  const fetchDataFeodsArmyPrice = useCallback(async () => {
    const response = await fetch(
      `https://vpi-node-js.vercel.app/feods-info-army-price/${params.id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    const data = await response.json();

    setFeodArmyPrice(data);
  }, [params.id]);

  useEffect(() => {
    fetchDataFeodsArmyPrice();
  }, [fetchDataFeodsArmyPrice, params.id]);

  console.log({ currentFeod }, { feodNumber });

  return (
    <>
      <Header />
      {/* Боковое меню */}
      <aside
        id="cta-button-sidebar"
        className="fixed top-15 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-slate-500">
          <ul className="space-y-2 font-medium">
            <div>Владения игрока {feodInfo[0] && feodInfo[0].login}:</div>
            {feodInfo.map((row: any) => (
              <li key={row.locations_name}>
                <button
                  className="flex items-center p-1 text-slate-500"
                  onClick={() => setFeodNumber(row.locations_id)}
                >
                  <span className="ms-3">{row.locations_name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Верхняя таблица ресурсов */}
      <div className="flex justify-center text-sm text-slate-500">
        <table>
          <tbody>
            <tr>
              <th className="p-2 text-base">
                {currentFeod && currentFeod.locations_name}:
              </th>
              <td className="p-2">
                крестьяне: {currentFeod && currentFeod.all_peasent}
              </td>
              <td className="p-2">
                рабы: {currentFeod && currentFeod.all_slave}
              </td>
              <td className="p-2">
                всего рабочих:{' '}
                {currentFeod && currentFeod.all_peasent_and_slave}
              </td>
              <td className="p-2">
                солдаты:{' '}
                {currentFeod && currentFeod.army_number
                  ? currentFeod.army_number
                  : 0}
              </td>
              <td className="p-2 font-bold">
                металл: {currentFeod && currentFeod.iron}
              </td>
              <td className="p-2 font-bold">
                древесина: {currentFeod && currentFeod.forest}
              </td>
              <td className="p-2 font-bold">
                шкуры: {currentFeod && currentFeod.skin}
              </td>
              <td className="p-2 font-bold">
                лошади: {currentFeod && currentFeod.horse}
              </td>
              <td className="p-2 font-bold">
                еда: {currentFeod && currentFeod.food}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Таблица Рабочих */}
      <div className="flex justify-center text-sm text-slate-500">
        <table>
          <thead>
            <tr>
              <th
                key={currentFeod && currentFeod.locations_name}
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
                    {currentFeod &&
                      currentFeod[tableInfoHeaderEl.resourseNumber[0]]}
                  </td>
                  {/* сколько рабов */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'slave'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                  >
                    {currentFeod &&
                      currentFeod[tableInfoHeaderEl.resourseNumber[1]]}
                  </td>
                  {/* лимит */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'limits'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                    title="Работает крестьян и рабов / максимальный лимит"
                  >
                    {currentFeod &&
                      currentFeod[tableInfoHeaderEl.resourseNumber[0]] +
                        currentFeod[tableInfoHeaderEl.resourseNumber[1]]}
                    /
                    {currentFeod &&
                      currentFeod[tableInfoHeaderEl.resourseNumber[2]]}
                  </td>
                  {/* Добыча ресурсов */}
                  <td
                    key={tableInfoHeaderEl.workplace + 'resource_production'}
                    colSpan={1}
                    className="w-28 border p-2 text-right"
                    title="Крестьяне добывают 1 ресурс, рабы 2 ресурса"
                  >
                    {`${
                      currentFeod &&
                      currentFeod[tableInfoHeaderEl.resourseNumber[0]] +
                        currentFeod[tableInfoHeaderEl.resourseNumber[1]] * 2
                    }`}
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
                {currentFeod && currentFeod.unused_peasents}
              </td>
              <td
                key={'Незанятые Рабы'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {currentFeod && currentFeod.unused_slaves}
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
                {currentFeod &&
                  currentFeod.work_peasent + currentFeod.unused_peasents}
              </td>
              <td
                key={'Всего крестьян'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {currentFeod &&
                  currentFeod.work_slave + currentFeod.unused_slaves}
              </td>
              <td
                key={'Общий лимит'}
                colSpan={1}
                className="w-28 border p-2 text-right"
              >
                {currentFeod &&
                  currentFeod.work_slave + currentFeod.unused_slaves}{' '}
                / {currentFeod && currentFeod.work_limits}
              </td>
              <td className="w-28 border p-2 text-right">-</td>
              <td className="w-28 border p-2 text-right">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br></br>
      <div className="flex justify-center text-sm text-slate-500">
        <table>
          <thead>
            <tr>
              <th
                key={currentFeod && currentFeod.locations_name}
                colSpan={10}
                className="w-28 p-2"
              >
                Снабжение и налоги
              </th>
            </tr>
            <tr>
              <th className="w-28 border  p-2"></th>
              <th className="w-28 border  p-2">Крестьяне</th>
              <th className="w-28 border  p-2">Рабы</th>
              <th className="w-28 border  p-2">Солдаты</th>
              <th className="w-28 border  p-2">Всего</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-48 border p-2 text-right">
                Потребляют снабжения
              </td>
              <td className="w-28 border p-2 text-right">
                {currentFeod && currentFeod.all_peasent}
              </td>
              <td className="w-28 border p-2 text-right">
                {currentFeod && currentFeod.all_slave}
              </td>
              <td className="w-28 border p-2 text-right">
                {currentFeod && currentFeod.army_number
                  ? currentFeod.army_number
                  : 0}
              </td>
              <td className="w-28 border p-2 text-right">
                {currentFeod &&
                  currentFeod.all_peasent +
                    currentFeod.all_slave +
                    Number(
                      currentFeod.army_number ? currentFeod.army_number : 0
                    )}
              </td>
            </tr>
            <tr>
              <td className="w-48 border p-2 text-right">Сбор налогов</td>
              <td
                className="w-28 border p-2 text-right "
                title="Каждый крестьянин платит 8 серебра налогов"
              >
                {currentFeod && currentFeod.all_peasent * 8}
              </td>
              <td className="w-28 border p-2 text-right">-</td>
              <td className="w-28 border p-2 text-right">-</td>
              <td
                className="w-28 border p-2 text-right"
                title="Каждый крестьянин платит 8 серебра налогов"
              >
                {currentFeod && currentFeod.all_peasent * 8}
              </td>
            </tr>
            <tr>
              <td className="w-48 border p-2 text-right">Жалование</td>
              <td className="w-28 border p-2 text-right">-</td>
              <td className="w-28 border p-2 text-right">-</td>
              <td
                className="w-28 border p-2 text-right"
                title="Детализация жалования на вкладке отрядов"
              >
                {currentFeod && currentFeod.army_prise}
              </td>
              <td
                className="w-28 border p-2 text-right"
                title="Детализация жалования на вкладке отрядов"
              >
                {currentFeod && currentFeod.army_prise}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;
