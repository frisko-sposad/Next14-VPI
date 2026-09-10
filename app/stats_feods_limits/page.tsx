'use client';
import React, { useMemo } from 'react';
import { polygonsData } from '@/public/database/data-polygons';
import Header from '@/components/Header/header';
import Table from '@/components/Table/Table';

const StatsTable = () => {
  const dataFeods = useMemo(() => polygonsData, []);

  // пересчитать JSON феодов
  const test = dataFeods.map((el) => {
    // const test2 = el.latlngs.forEach((el) => {
    //   res = { lat: el.lat, lng: el.lng };
    // }, 0);
    // console.log(test2);
    let lat = 0;
    let lng = 0;
    for (let i = 0; i < el.latlngs.length; i++) {
      lat += el.latlngs[i].lat;
      lng += el.latlngs[i].lng;
    }
    // console.log({ lat: lat / el.latlngs.length, lng: lng / el.latlngs.length });

    return {
      ...el,
      //   Resources: {
      //     mines: Math.round(el.info.Resources.mines * 0.33),
      //     forest: Math.round(el.info.limits.forest * 0.33),
      //     skins: Math.round(el.info.limits.skins * 0.33),
      //     horses: Math.round(el.info.limits.horses * 0.33),
      //     food: Math.round(el.info.limits.food * 0.33),
      center: { lat: lat / el.latlngs.length, lng: lng / el.latlngs.length },
    };
  });
  console.log(JSON.stringify(test));

  // const sumWithInitial = array1.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   initialValue,
  // );

  const data = dataFeods.map((el) => {
    const populationPeasent =
      el.info.peasent.mines +
      el.info.peasent.forest +
      el.info.peasent.skins +
      el.info.peasent.horses +
      el.info.peasent.food;
    const populationSlave =
      el.info.slave.mines +
      el.info.slave.forest +
      el.info.slave.skins +
      el.info.slave.horses +
      el.info.slave.food;
    const populationLimit =
      el.info.limits.mines +
      el.info.limits.forest +
      el.info.limits.skins +
      el.info.limits.horses +
      el.info.limits.food;

    const res = {
      id: el.id,
      name: el.info.name,
      text: el.info.text,
      minesPeasent: el.info.peasent.mines,
      minesSlave: el.info.slave.mines,
      minesLimits: el.info.limits.mines,
      forestPeasent: el.info.peasent.forest,
      forestSlave: el.info.slave.forest,
      forestLimits: el.info.limits.forest,
      skinsPeasent: el.info.peasent.skins,
      skinsSlave: el.info.slave.skins,
      skinsLimits: el.info.limits.skins,
      horsesPeasent: el.info.peasent.horses,
      horsesSlave: el.info.slave.horses,
      horsesLimits: el.info.limits.horses,
      foodPeasent: el.info.peasent.food,
      foodSlave: el.info.slave.food,
      foodLimits: el.info.limits.food,
      owner: el.info.owner,
      religion: el.info.religion,
      populationPeasent,
      populationSlave,
      populationLimit,
      overlord: el.info.overlord,
    };

    return res;
  });

  const columnsHeroes = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Название',
        accessor: 'name',
      },
      {
        Header: 'Шахты',
        accessor: 'minesLimits',
      },
      {
        Header: 'Лес',
        accessor: 'forestLimits',
      },
      {
        Header: 'Скот',
        accessor: 'skinsLimits',
      },
      {
        Header: 'Лошади',
        accessor: 'horsesLimits',
      },
      {
        Header: 'Поля',
        accessor: 'foodLimits',
      },

      {
        Header: 'Религия',
        accessor: 'religion',
      },
      {
        Header: 'Описание',
        accessor: 'text',
      },
      {
        Header: 'Сюзерен',
        accessor: 'overlord',
      },
      {
        Header: 'Владелец',
        accessor: 'owner',
      },
    ],
    [],
  );

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex-col">
          <div className="pt-5">
            <div className="flex justify-center">
              Лимиты на ресурсы(сколько максимум рабочих можно послать на
              добычу)
            </div>
            <br />
            <Table columns={columnsHeroes} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
