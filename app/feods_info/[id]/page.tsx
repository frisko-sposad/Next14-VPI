'use client';
import host_api from '@/app/host_api';
import Header from '@/components/Header/header';
import { useCallback, useEffect, useState } from 'react';

const tableInfo = [
  { title: '', subTitle: ['Феод'] },
  { title: 'Шахты', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Лес', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Скот', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Лошади', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Снабжение', subTitle: ['Крестьяне', 'Рабы', 'Лимит'] },
  { title: 'Лемит феода', subTitle: ['Лемит феода'] },
  { title: 'Работают', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Незанятые', subTitle: ['Крестьяне', 'Рабы'] },
  { title: 'Всего', subTitle: ['Крестьяне', 'Рабы'] },
];

const FeodsInfo = ({ params }: { params: { id: number } }) => {
  const [dataUsers, setDataUsers] = useState([] as any);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${host_api}/feods-info-worker/${params.id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    const data = await response.json();
    console.log({ data });

    setDataUsers(data);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, params.id]);

  return (
    <>
      <Header />
      <div>
        <div className="flex justify-center">
          <div className="flex-col">
            <div className="text-slate-500">
              Игрок: {dataUsers[0] && dataUsers[0].login}
            </div>
          </div>
        </div>
        <br></br>
        {/* Шапка */}
        <div className="flex justify-center text-sm">
          <table>
            <thead>
              <tr>
                {tableInfo.map((titleEl) => (
                  <th
                    key={titleEl.title}
                    colSpan={titleEl.subTitle.length}
                    className="w-48 border p-2 text-slate-500 dark:text-slate-400"
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
                        className="border p-2 text-slate-500 dark:text-slate-400"
                      >
                        {subtitleEl}
                      </th>
                    ))}
                  </>
                ))}
              </tr>
            </thead>

            <tbody>
              {dataUsers.map((row: any, i: any) => (
                <tr
                  key={row.locations_production_id}
                  className="border p-2 text-slate-500 dark:text-slate-400"
                >
                  <td
                    key={row.locations_production_id + 'locations_name'}
                    className="border p-2"
                  >
                    {row.locations_name}
                  </td>
                  <td
                    key={row.locations_production_id + 'mines_peasent'}
                    className="border p-2"
                  >
                    {row.mines_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'mines_slave'}
                    className="border p-2"
                  >
                    {row.mines_slave}
                  </td>
                  <td
                    key={row.locations_production_id + 'mines_limits'}
                    className="border p-2"
                  >
                    {row.mines_limits}
                  </td>
                  <td
                    key={row.locations_production_id + 'forest_peasent'}
                    className="border p-2"
                  >
                    {row.forest_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'forest_slave'}
                    className="border p-2"
                  >
                    {row.forest_slave}
                  </td>
                  <td
                    key={row.locations_production_id + 'forest_limits'}
                    className="border p-2"
                  >
                    {row.forest_limits}
                  </td>
                  <td
                    key={row.locations_production_id + 'skins_peasent'}
                    className="border p-2"
                  >
                    {row.skins_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'skins_slave'}
                    className="border p-2"
                  >
                    {row.skins_slave}
                  </td>
                  <td
                    key={row.locations_production_id + 'skins_limits'}
                    className="border p-2"
                  >
                    {row.skins_limits}
                  </td>
                  <td
                    key={row.locations_production_id + 'horses_peasent'}
                    className="border p-2"
                  >
                    {row.horses_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'horses_slave'}
                    className="border p-2"
                  >
                    {row.horses_slave}
                  </td>
                  <td
                    key={row.locations_production_id + 'horses_limits'}
                    className="border p-2"
                  >
                    {row.horses_limits}
                  </td>
                  <td
                    key={row.locations_production_id + 'food_peasent'}
                    className="border p-2"
                  >
                    {row.food_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'food_slave'}
                    className="border p-2"
                  >
                    {row.food_slave}
                  </td>
                  <td
                    key={row.locations_production_id + 'food_limits'}
                    className="border p-2"
                  >
                    {row.food_limits}
                  </td>
                  <td
                    key={row.locations_production_id + 'all_limits'}
                    className="border p-2"
                  >
                    {row.all_limits}
                  </td>
                  <td
                    key={row.locations_production_id + 'work_peasent'}
                    className="border p-2"
                  >
                    {row.work_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'work_slave'}
                    className="border p-2"
                  >
                    {row.work_slave}
                  </td>
                  <td
                    key={row.locations_production_id + 'unused_peasents'}
                    className="border p-2"
                  >
                    {row.unused_peasents}
                  </td>
                  <td
                    key={row.locations_production_id + 'unused_slaves'}
                    className="border p-2"
                  >
                    {row.unused_slaves}
                  </td>
                  <td
                    key={row.locations_production_id + 'all_peasent'}
                    className="border p-2"
                  >
                    {row.all_peasent}
                  </td>
                  <td
                    key={row.locations_production_id + 'all_slave'}
                    className="border p-2"
                  >
                    {row.all_slave}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FeodsInfo;
