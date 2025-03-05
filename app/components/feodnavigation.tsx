'use client';
import { useEffect, useState } from 'react';

const FeodNavigation = ({
  params,
  feodNumber,
}: {
  params: { id: number };
  feodNumber: Number;
}) => {
  const [allfeodNavigation, setAllFeodNavigation] = useState([] as any);
  const [feodNavigation, setFeodNavigation] = useState([] as any);
  console.log({ allfeodNavigation, feodNavigation });

  useEffect(() => {
    let dataFeodNavigation = allfeodNavigation.filter(
      (item: { path_graph_location_id_from: number }) =>
        item.path_graph_location_id_from == feodNumber
    );

    setFeodNavigation(dataFeodNavigation);
  }, [allfeodNavigation, feodNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/feods-navigation/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      setAllFeodNavigation(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      {/* Таблица Границ */}
      <div className="flex justify-center text-sm text-slate-500">
        <table>
          <tbody>
            <tr className="p-2 border font-bold">
              <td className="p-2">Граничит с:</td>
            </tr>
            {feodNavigation.dataFeodNavigation &&
              feodNavigation.dataFeodNavigation.map((row: any) => (
                <tr className="p-2 border" key={row.locations_name}>
                  <td className="p-2">{row.locations_name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeodNavigation;
