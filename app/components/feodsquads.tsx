'use client';
import { Fragment, useEffect, useState } from 'react';

const UserSquads = ({
  params,
  feodNumber,
  squadType,
}: {
  params: { id: number };
  feodNumber: Number;
  squadType: Number;
}) => {
  const [userSquads, setUserSquads] = useState([] as any);
  const [currentSquads, setCurrentSquads] = useState([] as any);

  const [allGroupUnits, setAllGroupUnits] = useState([] as any);
  const [feodGroupUnits, setFeodGroupUnits] = useState([] as any);
  const [allHeroes, setAllHeroes] = useState([] as any);
  const [heroes, setHeroes] = useState([] as any);

  //Фильтруем по номеру локации и типу отряда
  useEffect(() => {
    let dataUserSquads = userSquads.filter(
      (item: any) =>
        item.locations_id == feodNumber && item.squad_type == squadType
    );

    setCurrentSquads(dataUserSquads);
  }, [allGroupUnits, feodNumber, squadType, userSquads]);

  useEffect(() => {
    let dataUserSquad = allGroupUnits.filter(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );

    setFeodGroupUnits(dataUserSquad);
  }, [allGroupUnits, feodNumber]);

  // Получаем список отрядов юзера
  useEffect(() => {
    let dataHeroes = allHeroes.filter(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    setHeroes(dataHeroes);
  }, [allHeroes, feodNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/user_squads/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();
      setUserSquads(data);
    };
    fetchData();
  }, [params.id]);

  // Информация по группам юнитов игрока
  useEffect(() => {
    let dataHeroes = allHeroes.filter(
      (item: { locations_id: number }) => item.locations_id == feodNumber
    );
    setHeroes(dataHeroes);
  }, [allHeroes, feodNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/units_groups/${params.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      setAllGroupUnits(data);
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://vpi-node-js.vercel.app/squad_heroes/${params.id}?squad_type=2`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      setAllHeroes(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      <div className="flex justify-center text-sm">
        <div className="p-2">
          <div className="flex justify-center text-base text-slate-500 text-sm font-bold">
            <div className="flex-col p-2 text-base">
              {squadType == 1 && <div>Гарнизон</div>}
              {squadType == 2 && <div>Отряды</div>}
            </div>
          </div>
          {currentSquads.map((currentSquad: any) => (
            <>
              <table key={currentSquads.id}>
                <thead>
                  <tr>
                    <th className="border p-2 text-slate-500" colSpan={6}>
                      {currentSquad.title}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Fragment key={currentSquad.title}>
                    <td className="p-2">
                      <tr>
                        <th
                          key={'feodGroupUnits_hero_name_title'}
                          className="border p-2 text-slate-500 w-32"
                        >
                          Тип Юнита
                        </th>
                        <th
                          key={'feodGroupUnits_locations_army_number_title'}
                          className="border p-2 text-slate-500 w-32"
                        >
                          Количество
                        </th>
                        <th
                          key={'feodGroupUnits_unit_price_title'}
                          className="border p-2 text-slate-500 w-32"
                        >
                          Жалование
                        </th>
                      </tr>
                      {feodGroupUnits.map(
                        (feodGropUnits: any) =>
                          feodGropUnits.squad_id == currentSquad.squad_id && (
                            <>
                              <tr>
                                <td
                                  key={'feodGropUnits.unit_name'}
                                  className="border p-2 text-slate-500 text-right"
                                >
                                  <div className="w-32">
                                    {feodGropUnits.unit_name}
                                  </div>
                                </td>
                                <td
                                  key={'feodGropUnits.number'}
                                  className="border p-2 text-slate-500 text-right"
                                >
                                  <div className="w-32">
                                    {feodGropUnits.number}
                                  </div>
                                </td>
                                <td
                                  key={'feodGropUnits.unit_price'}
                                  className="border p-2 text-slate-500 text-right"
                                >
                                  <div className="w-32">
                                    {feodGropUnits.unit_price *
                                      feodGropUnits.number}
                                  </div>
                                </td>
                              </tr>
                            </>
                          )
                      )}
                    </td>
                    <td className="p-2">
                      <tr key={'hero_name'}>
                        <th className="border p-2 text-slate-500 w-40">
                          Персонажи
                        </th>
                      </tr>
                      {heroes
                        .filter(
                          (heroes: any) =>
                            heroes.squad_id == currentSquad.squad_id
                        )
                        .map((hero: any) => (
                          <tr key={hero.hero_name}>
                            <td className="border p-2 text-slate-500">
                              {hero.hero_name}
                            </td>
                          </tr>
                        ))}
                    </td>
                  </Fragment>
                </tbody>
              </table>
              <br />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSquads;
