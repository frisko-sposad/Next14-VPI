'use client';
import { useEffect, useState } from 'react';

const FeodResources = ({
  params,
  feodNumber,
}: {
  params: { id: number };
  feodNumber: Number;
}) => {
  const [allfeodResources, setAllFeodResources] = useState([] as any);
  const [feodResources, setFeodResources] = useState([] as any);

  useEffect(() => {
    let dataFeodResources = allfeodResources.find(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    setFeodResources(dataFeodResources);
  }, [allfeodResources, feodNumber]);

  useEffect(() => {
    const fetchData = async () => {
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

      setAllFeodResources(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="flex justify-center text-sm text-slate-500">
      <table>
        <tbody>
          <tr>
            <th className="p-2 text-base">
              {feodResources && feodResources.locations_name}:
            </th>
            <td className="p-2 font-bold">
              металл: {feodResources && feodResources.iron}
            </td>
            <td className="p-2 font-bold">
              древесина: {feodResources && feodResources.forest}
            </td>
            <td className="p-2 font-bold">
              шкуры: {feodResources && feodResources.skin}
            </td>
            <td className="p-2 font-bold">
              лошади: {feodResources && feodResources.horse}
            </td>
            <td className="p-2 font-bold">
              еда: {feodResources && feodResources.food}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeodResources;
