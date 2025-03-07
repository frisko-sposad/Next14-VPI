'use client';
import { useEffect, useState } from 'react';

const FeodLeftMenu = ({
  params,
  setFeodNumber,
}: {
  params: { id: number };
  setFeodNumber: any;
}) => {
  const [feodInfo, setFeodInfo] = useState([] as any);

  // проверяем выбранный феод и записываем в feoInfo данные по выбранному феоду

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

      setFeodInfo(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <>
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
    </>
  );
};

export default FeodLeftMenu;
