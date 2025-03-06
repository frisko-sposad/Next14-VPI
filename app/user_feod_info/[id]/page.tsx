'use client';
import FeodNavigation from '@/app/components/feodnavigation';
import FeodResources from '@/app/components/feodresources';
import FeodWorker from '@/app/components/feodwarker';
import Garrison from '@/app/components/garrison';
import UserSquads from '@/app/components/usersquads';
import Header from '@/components/Header/header';
import { useCallback, useEffect, useState } from 'react';

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [feodInfo, setFeodInfo] = useState([] as any);
  const [feodInfoResources, setFeodInfoResources] = useState([] as any);
  const [feodArmyPrice, setFeodArmyPrice] = useState([] as any);
  const [feodNumber, setFeodNumber] = useState(1);
  const [currentFeod, setCurrentFeod] = useState({} as any);
  const [subPage, setSubPage] = useState('resourse' as any);

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

    setCurrentFeod({
      ...dataFeod,
      ...dataFeodResources,
      ...dataFeodArmyPrice,
    });
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

  return (
    <>
      <Header />
      <nav
        className="mx-auto flex  items-center justify-center p-2 "
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={() => setSubPage('resourse')}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Рабочие и добыча
          </button>
          <button
            onClick={() => setSubPage('finance')}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Снабжение и налоги
          </button>
          <button
            onClick={() => setSubPage('squad')}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Гарнизон и отряды
          </button>
          <button
            onClick={() => setSubPage('navigation')}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Соседние владения
          </button>
        </div>
      </nav>
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

      <FeodResources
        params={{
          id: params.id,
        }}
        feodNumber={feodNumber}
      />

      {subPage == 'resourse' && (
        <FeodWorker
          params={{
            id: params.id,
          }}
          feodNumber={feodNumber}
        />
      )}
      {subPage == 'finance' && (
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
                    : '-'}
                </td>
                <td className="w-28 border p-2 text-right">
                  {currentFeod &&
                    currentFeod.all_peasent &&
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
                  {currentFeod &&
                    currentFeod.all_peasent &&
                    currentFeod.all_peasent * 8}
                </td>
                <td className="w-28 border p-2 text-right">-</td>
                <td className="w-28 border p-2 text-right">-</td>
                <td
                  className="w-28 border p-2 text-right"
                  title="Каждый крестьянин платит 8 серебра налогов"
                >
                  {currentFeod &&
                    currentFeod.all_peasent &&
                    currentFeod.all_peasent * 8}
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
      )}

      {/* Таблица Границ */}
      {subPage == 'navigation' && (
        <div className="flex justify-center text-sm text-slate-500">
          <FeodNavigation
            params={{
              id: params.id,
            }}
            feodNumber={feodNumber}
          />
        </div>
      )}
      {subPage == 'squad' && (
        <>
          <Garrison
            params={{
              id: params.id,
            }}
            feodNumber={feodNumber}
          />
          <br></br>
          <UserSquads
            params={{
              id: params.id,
            }}
            feodNumber={feodNumber}
          />
        </>
      )}
    </>
  );
};

export default UserInfo;
