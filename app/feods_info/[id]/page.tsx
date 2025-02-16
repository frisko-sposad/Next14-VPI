'use client';
import Header from '@/components/Header/header';
import { useCallback, useEffect, useState } from 'react';

const table1Value1 = [
  ['mines_peasent', 'mines_slave', 'mines_limits'],
  ['forest_peasent', 'forest_slave', 'forest_limits'],
  ['skins_peasent', 'skins_slave', 'skins_limits'],
  ['horses_peasent', 'horses_slave', 'horses_limits'],
  ['food_peasent', 'food_slave', 'food_limits'],
];

const table2Value1 = [
  ['mines_peasent', 'mines_slave', 'mines_limits'],
  ['forest_peasent', 'forest_slave', 'forest_limits'],
  ['skins_peasent', 'skins_slave', 'skins_limits'],
  ['horses_peasent', 'horses_slave', 'horses_limits'],
];
const tableValue2 = [
  ['population_work_peasent', 'population_work_slave'],
  ['unused_peasents', 'unused_slaves'],
  ['population_all_peasent', 'population_all_slave'],
];
const tableValue3 = [['population_all_peasent', 'population_all_slave']];
const tableFood = [
  [
    'food_peasent',
    'food_slave',
    'population_all_peasent',
    'population_all_slave',
  ],
];

const tableInfo = [
  { title: '', subTitle: ['Феод'] },
  { title: 'Шахты', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Лес', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Скот', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Лошади', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Снабжение', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Работают', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Незанятые', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Всего', subTitle: ['Крестьяне', 'Рабы'] },
];

const tableInfoResources = [
  { title: '', subTitle: ['Феод'] },
  { title: 'Металл', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
  { title: 'Дерево', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
  { title: 'Шкуры', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
  { title: 'Лошади', subTitle: ['Крестьяне', 'Рабы', 'Всего'] },
  { title: 'Снабжение', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Пропитание', subTitle: ['Снабжение', 'Излишки'] },
  { title: 'Собрано налогов', subTitle: ['Крестьяне х8', 'Рабы'] },
  { title: '----', subTitle: [''] },
];

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);
  const [feodNumber, setFeodNumber] = useState(0);
  const [currentFeod, setCurrentFeod] = useState([] as any);

  const [responseStatus, setResponseStatus] = useState('' as any);

  // проверяем выбранный феод и записываем в feoInfo данные по выбранному феоду
  useEffect(() => {
    let dataFeod = dataUsers.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    // setFeodInfo(dataFeod);
    setCurrentFeod(dataFeod);
  }, [dataUsers, feodNumber]);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://vpi-node-js.vercel.app/feods/${params.id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    const data = await response.json();

    const dataFeod = data.map(
      (el: {
        mines_peasent: any;
        forest_peasent: any;
        skins_peasent: any;
        horses_peasent: any;
        food_peasent: any;
        mines_slave: any;
        forest_slave: any;
        skins_slave: any;
        horses_slave: any;
        food_slave: any;
        mines_limits: any;
        forest_limits: any;
        skins_limits: any;
        horses_limits: any;
        food_limits: any;
        unused_peasents: any;
        unused_slaves: any;
        login: any;
      }) => {
        const login = el.login;

        const res = {
          ...el,
          population_work_peasent:
            el.mines_peasent +
            el.forest_peasent +
            el.skins_peasent +
            el.horses_peasent +
            el.food_peasent,
          population_work_slave:
            el.mines_slave +
            el.forest_slave +
            el.skins_slave +
            el.horses_slave +
            el.food_slave,
          population_work_limits:
            el.mines_limits +
            el.forest_limits +
            el.skins_limits +
            el.horses_limits +
            el.food_limits,
          population_all_peasent:
            el.mines_peasent +
            el.forest_peasent +
            el.skins_peasent +
            el.horses_peasent +
            el.food_peasent +
            el.unused_peasents,
          population_all_slave:
            el.mines_slave +
            el.forest_slave +
            el.skins_slave +
            el.horses_slave +
            el.food_slave +
            el.unused_slaves,
          login,
        };

        return res;
      }
    );
    setDataUsers(dataFeod);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, params.id, responseStatus]);

  // функция отправки формы
  const onSubmit = async () => {
    const response = await fetch(`https://vpi-node-js.vercel.app/update_feod`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        locations_id: Number(currentFeod.locations_id),
        locations_name: currentFeod.locations_name,
        mines_peasent: Number(currentFeod.mines_peasent),
        forest_peasent: Number(currentFeod.forest_peasent),
        horses_peasent: Number(currentFeod.horses_peasent),
        skins_peasent: Number(currentFeod.skins_peasent),
        food_peasent: Number(currentFeod.food_peasent),
        mines_slave: Number(currentFeod.mines_slave),
        forest_slave: Number(currentFeod.forest_slave),
        horses_slave: Number(currentFeod.horses_slave),
        skins_slave: Number(currentFeod.skins_slave),
        food_slave: Number(currentFeod.food_slave),
        mines_limits: Number(currentFeod.mines_limits),
        forest_limits: Number(currentFeod.forest_limits),
        horses_limits: Number(currentFeod.horses_limits),
        skins_limits: Number(currentFeod.skins_limits),
        food_limits: Number(currentFeod.food_limits),
        unused_peasents: Number(currentFeod.unused_peasents),
        unused_slaves: Number(currentFeod.unused_slaves),
      }),
    });
    const data = await response.json();
    fetchData();
    setResponseStatus(data);
  };

  return (
    <>
      <Header />
      <div>
        <div className="flex justify-center">
          <div className="flex-col">
            <div>Игрок: {dataUsers[0] && dataUsers[0].login}</div>
          </div>
        </div>
        {/* Блок с данными по всем феодам */}
        <div className="flex justify-center text-sm">
          <table>
            <thead>
              <tr>
                {tableInfo.map((titleEl) => (
                  <th
                    key={titleEl.title}
                    colSpan={titleEl.subTitle.length}
                    className="w-48 border p-2 text-slate-500"
                  >
                    {titleEl.title}
                  </th>
                ))}
              </tr>
              <tr>
                {tableInfo.map((titleEl) => (
                  <>
                    {titleEl.subTitle.map((subtitleEl) => (
                      <th
                        key={subtitleEl}
                        colSpan={1}
                        className="border p-2 text-slate-500"
                      >
                        {subtitleEl}
                      </th>
                    ))}
                  </>
                ))}
              </tr>
            </thead>
            <tbody className="border p-2 text-slate-500">
              {
                <>
                  {dataUsers.map((row: any) => (
                    <tr
                      key={'row_' + row.locations_id}
                      className="border p-2 text-slate-500"
                    >
                      <td className="border p-2 text-slate-500">
                        {row.locations_name}
                      </td>
                      {table1Value1.map((tableValueEl) => (
                        <>
                          <td
                            key={tableValueEl[0]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">{row[tableValueEl[0]]}</div>
                          </td>
                          <td
                            key={tableValueEl[1]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">{row[tableValueEl[1]]}</div>
                          </td>
                          <td
                            key={tableValueEl[2]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20 font-semibold">
                              {row[tableValueEl[0]] + row[tableValueEl[1]]} /{' '}
                              {row[tableValueEl[2]]}
                            </div>
                          </td>
                        </>
                      ))}
                      {tableValue2.map((tableValueEl) => (
                        <>
                          <td
                            key={tableValueEl[0]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">{row[tableValueEl[0]]}</div>
                          </td>
                          <td
                            key={tableValueEl[1]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">{row[tableValueEl[1]]}</div>
                          </td>
                        </>
                      ))}
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
        <br></br>
        {/* Таблица Доходов */}
        <div className="flex justify-center">
          <div className="flex-col">
            <div className="text-slate-500">
              Доходы(рабы добывают в 2 раза больше ресурсов, но не платят
              налоги, каждый крестьянин платит по 8 серебра налогов, при
              перелимите 4 2 0):
            </div>
          </div>
        </div>
        <div className="flex justify-center text-sm">
          <table>
            <thead>
              <tr>
                {tableInfoResources.map((titleEl) => (
                  <th
                    key={titleEl.title}
                    colSpan={titleEl.subTitle.length}
                    className="w-48 border p-2 text-slate-500"
                  >
                    {titleEl.title}
                  </th>
                ))}
              </tr>
              <tr>
                {tableInfoResources.map((titleEl) => (
                  <>
                    {titleEl.subTitle.map((subtitleEl) => (
                      <th
                        key={subtitleEl}
                        colSpan={1}
                        className="border p-2 text-slate-500"
                      >
                        {subtitleEl}
                      </th>
                    ))}
                  </>
                ))}
              </tr>
            </thead>
            <tbody className="border p-2 text-slate-500">
              {
                <>
                  {dataUsers.map((row: any) => (
                    <tr
                      key={'row_' + row.locations_id}
                      className="border p-2 text-slate-500"
                    >
                      <td className="border p-2 text-slate-500">
                        {row.locations_name}
                      </td>
                      {table2Value1.map((tableValueEl) => (
                        <>
                          <td
                            key={tableValueEl[0]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">{row[tableValueEl[0]]}</div>
                          </td>
                          <td
                            key={tableValueEl[1]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">
                              {row[tableValueEl[1]] * 2}
                            </div>
                          </td>
                          <td
                            key={tableValueEl[2]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20 font-semibold">
                              {row[tableValueEl[0]] + row[tableValueEl[1]] * 2}
                            </div>
                          </td>
                        </>
                      ))}
                      {/* Добывают Снабжение */}
                      {tableFood.map((tableValueEl) => (
                        <>
                          <td
                            key={tableValueEl[0]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">
                              {row['food_peasent'] * 2}
                            </div>
                          </td>
                          <td
                            key={tableValueEl[1]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">{row['food_slave'] * 3}</div>
                          </td>
                        </>
                      ))}
                      {/* Съедают снабжения */}
                      {tableValue3.map((tableValueEl) => (
                        <>
                          <td
                            key={tableValueEl[0]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            {/* Тратят снабжения */}
                            <div className="w-20">
                              {row['population_all_peasent'] +
                                row['population_all_slave']}
                            </div>
                          </td>
                          <td
                            key={tableValueEl[1]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            {/* Излишки Баланс снабжения после пропитания */}
                            <div
                              className={`w-20 ${
                                row['food_peasent'] * 2 +
                                  row['food_slave'] * 3 -
                                  row['population_all_peasent'] -
                                  row['population_all_slave'] <
                                  0 && 'text-red-600'
                              }`}
                            >
                              {row['food_peasent'] * 2 +
                                row['food_slave'] * 3 -
                                row['population_all_peasent'] -
                                row['population_all_slave']}
                            </div>
                          </td>
                        </>
                      ))}
                      {/* Налоги */}
                      {tableValue3.map((tableValueEl) => (
                        <>
                          <td
                            key={tableValueEl[0]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">
                              {row['population_all_peasent'] * 8}
                            </div>
                          </td>
                          <td
                            key={tableValueEl[1]}
                            className="border p-2 text-slate-500 text-right"
                          >
                            <div className="w-20">
                              {row['population_all_slave'] * 0}
                            </div>
                          </td>
                        </>
                      ))}
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
