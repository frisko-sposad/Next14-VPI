'use client';
import Header from '@/components/Header/header';
import { useEffect, useState } from 'react';

const tableValue = [
  'mines_peasent',
  'mines_slave',
  'forest_peasent',
  'forest_slave',
  'skins_peasent',
  'skins_slave',
  'horses_peasent',
  'horses_slave',
  'food_peasent',
  'food_slave',
  'population_work_peasent',
  'population_work_slave',
  'unused_peasents',
  'unused_slaves',
  'population_all_peasent',
  'population_all_slave',
];

const tableInfo = [
  { title: '', subTitle: ['Феод'] },
  { title: 'Шахты', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Лес', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Скот', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Лошади', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Снабжение', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Работают', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Незанятые', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Всего', subTitle: ['Крестьяне', 'Рабы'] },
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

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [params.id, responseStatus]);

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
        <div className="flex justify-center">
          <table className="table-auto">
            <thead>
              <tr>
                {tableInfo.map((titleEl) => (
                  <th
                    key={titleEl.title}
                    colSpan={titleEl.subTitle.length}
                    className="w-64 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
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
                        className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                      >
                        {subtitleEl}
                      </th>
                    ))}
                  </>
                ))}
              </tr>
            </thead>
            <tbody className="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
              {
                <>
                  {dataUsers.map((row: any) => (
                    <tr
                      key={'row_' + row.locations_id}
                      className="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                    >
                      <td className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {row.locations_name}
                      </td>
                      {tableValue.map((tableValueEl: string) => (
                        <td
                          key={tableValueEl + 1}
                          className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                        >
                          {row[tableValueEl]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
        <br></br>
        {/* Блок для редактирования выбранного феода */}
        {/* Шапка */}
        <div className="flex justify-center">
          <table className="table-auto">
            <thead>
              <tr>
                {tableInfo.map((titleEl) => (
                  <th
                    key={titleEl.title}
                    colSpan={titleEl.subTitle.length}
                    className="w-64 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
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
                        className="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                      >
                        {subtitleEl}
                      </th>
                    ))}
                  </>
                ))}
              </tr>
            </thead>
            {/* Ячейка выбора феода для редактирования */}
            <tbody className="border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
              {
                <>
                  <td
                    key="{item.id}"
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <select
                      onChange={(event: any) =>
                        setFeodNumber(event.target.value)
                      }
                    >
                      <option selected disabled label="Выберите феод"></option>
                      {dataUsers.map(
                        (option: {
                          locations_id: number;
                          locations_name: string;
                        }) => (
                          <option
                            key={option.locations_id}
                            value={option.locations_id}
                            label={option.locations_name}
                          ></option>
                        )
                      )}
                    </select>
                  </td>
                  {/* Ячейки с данными для редактирования */}
                  <td
                    key={'mines_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.mines_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          mines_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'mines_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.mines_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          mines_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'forest_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.forest_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          forest_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'forest_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.forest_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          forest_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'skins_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.skins_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          skins_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'skins_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.skins_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          skins_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'horses_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.horses_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          horses_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'horses_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.horses_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          horses_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'food_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.food_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          food_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'food_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.food_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          food_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'population_work_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.population_work_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          population_work_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'population_work_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.population_work_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          population_work_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'unused_peasents'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.unused_peasents}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          unused_peasents: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'unused_slaves'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.unused_slaves}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          unused_slaves: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'population_all_peasent'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.population_all_peasent}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          population_all_peasent: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td
                    key={'population_all_slave'}
                    className="w-24 border border-slate-300 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    <input
                      className="text-right w-24"
                      type="number"
                      max={10000}
                      min={0}
                      value={currentFeod && currentFeod.population_all_slave}
                      onChange={(event) =>
                        setCurrentFeod({
                          ...currentFeod,
                          population_all_slave: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                </>
              }
            </tbody>
          </table>
        </div>
        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="w-32 py-2 rounded-md text-white bg-green-400 hover:bg-green-500 active:bg-green-700"
            onClick={() =>
              feodNumber == 0
                ? setResponseStatus('Феод не выбран!')
                : onSubmit()
            }
          >
            Изменить
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-2">{responseStatus}</div>
    </>
  );
};

export default UserInfo;
