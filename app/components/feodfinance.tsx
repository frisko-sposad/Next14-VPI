'use client';
import { useCallback, useEffect, useState } from 'react';

const FeodFinance = ({
  params,
  feodNumber,
}: {
  params: { id: number };
  feodNumber: Number;
}) => {
  const [feodInfo, setFeodInfo] = useState([] as any);
  const [feodArmyPrice, setFeodArmyPrice] = useState([] as any);
  const [currentFeod, setCurrentFeod] = useState({} as any);

  useEffect(() => {
    let dataFeod = feodInfo.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    let dataFeodArmyPrice = feodArmyPrice.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    setCurrentFeod({
      ...dataFeod,
      ...dataFeodArmyPrice,
    });
  }, [feodArmyPrice, feodInfo, feodNumber]);

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
  }, [params.id]);

  useEffect(() => {
    fetchDataFeodInfo();
  }, [fetchDataFeodInfo, params.id]);

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
            <td className="w-48 border p-2 text-right">Потребляют снабжения</td>
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
                  Number(currentFeod.army_number ? currentFeod.army_number : 0)}
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
  );
};

export default FeodFinance;
