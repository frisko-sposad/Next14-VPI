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
    type: 'леса',
    resourseNumber: ['forest_peasent', 'forest_slave', 'forest_limits'],
  },
  {
    workplace: 'Скотоферма',
    type: 'шкур',
    resourseNumber: ['skins_peasent', 'skins_slave', 'skins_limits'],
  },
  {
    workplace: 'Конюшни',
    type: 'лошадей',
    resourseNumber: ['horses_peasent', 'horses_slave', 'horses_limits'],
  },
  {
    workplace: 'Снабжение',
    type: 'еды',
    resourseNumber: ['food_peasent', 'food_slave', 'food_limits'],
  },

  // {
  //   title: ['Работают', '??'],
  //   subTitle: ['Крестьяне', 'Рабы', 'Лимит', 'Добыча металла'],
  //   resourseNumber: ['work_peasent', 'work_slave', 'work_limits'],
  // },
  // {
  //   title: ['Незанятые', '???'],
  //   subTitle: ['Крестьяне', 'Рабы', 'Лимит', 'Добыча металла'],
  //   resourseNumber: ['unused_peasents', 'unused_slaves'],
  // },
  // {
  //   title: ['Всего', '???'],
  //   subTitle: ['Крестьяне', 'Рабы', 'Лимит', 'Добыча металла'],
  //   resourseNumber: [''],
  // },
];

// const tableExtractionResourcesHeader = [
//   { title: subTitle: ['Феод'] },
//   { title: 'Металл', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
//   { title: 'Дерево', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
//   { title: 'Шкуры', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
//   { title: 'Лошади', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
//   {
//     title: 'Производство снабжения',
//     subTitle: ['Крестьяне 2х', 'Рабы 3х', 'Кр Скот', 'Р Скот', 'Всего'],
//   },
//   { title: 'Пропитание', subTitle: ['Рабочие', 'Армия', 'Излишки'] },
//   {
//     title: 'Собрано налогов',
//     subTitle: ['Крестьяне 8х', 'Жалование', 'Доход'],
//   },
// ];

// const tableResourceInfo = [
//   ['mines_peasent', 'mines_slave', 'mines_limits'],
//   ['forest_peasent', 'forest_slave', 'forest_limits'],
//   ['skins_peasent', 'skins_slave', 'skins_limits'],
//   ['horses_peasent', 'horses_slave', 'horses_limits'],
//   ['food_peasent', 'food_slave', 'food_limits'],
// ];

// const tableResourceExtraction = [
//   ['mines_peasent', 'mines_slave', 'mines_limits'],
//   ['forest_peasent', 'forest_slave', 'forest_limits'],
//   ['skins_peasent', 'skins_slave', 'skins_limits'],
//   ['horses_peasent', 'horses_slave', 'horses_limits'],
// ];

const tableTitle = [
  'Место работы',
  'Крестьяне',
  'Рабы',
  'Лимит',
  'Добыча ресурсов',
  'Тип Ресурса',
];

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);
  const [feodNumber, setFeodNumber] = useState(1);
  const [currentFeod, setCurrentFeod] = useState({} as any);

  // проверяем выбранный феод и записываем в feoInfo данные по выбранному феоду
  useEffect(() => {
    let dataFeod = dataUsers.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    setCurrentFeod(dataFeod);
  }, [dataUsers, feodNumber]);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://vpi-node-js.vercel.app/feods-info/${params.id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    const data = await response.json();

    setDataUsers(data);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, params.id]);

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
            <div>Владения игрока {dataUsers[0] && dataUsers[0].login}:</div>
            {dataUsers.map((row: any) => (
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
      {/* Боковое меню */}
      {/* Таблица */}
      <div className="flex justify-center text-sm text-slate-500">
        <table>
          <thead>
            <tr>
              <th
                key={currentFeod && currentFeod.locations_name}
                colSpan={10}
                className="w-28 text-base  p-2 "
              >
                {currentFeod && currentFeod.locations_name}
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
                    {currentFeod &&
                      currentFeod[tableInfoHeaderEl.resourseNumber[0]] +
                        currentFeod[tableInfoHeaderEl.resourseNumber[1]] * 2}
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;
