'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { battle, ParseData } from '@/function/battle';
import { getParseData } from '@/function/get-parse-data';
import PlayerArmy from '@/components/Calculator/player-army';
import { Logs, LogData } from '@/components/Calculator/logs';
import Header from '@/components/Header/header';
import BattleResults from '@/components/Calculator/battle-results';

const App = () => {
  const [unitsData, setUnitsData] = useState({} as unknown as ParseData);
  const [logsData, setLogData] = useState([] as unknown as LogData[]);
  const [resultBattleData, setResultBattleData] = useState(unitsData);

  const methods = useForm();
  const {
    // register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    setUnitsData(getParseData(data));
  };

  useEffect(() => {
    if (Object.keys(unitsData).length !== 0) {
      const { logsData, unitData } = battle(unitsData);

      setResultBattleData(unitData);
      setLogData(logsData);
    }
  }, [unitsData]);

  return (
    <>
      <Header />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <PlayerArmy player="player1" />
            <PlayerArmy player="player2" />
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className="w-32 py-2 rounded-md text-white bg-green-300 hover:bg-green-500 active:bg-green-700"
            />
          </div>
        </form>
      </FormProvider>
      {/* {Object.keys(unitsData).length !== 0 && <Report data={unitsData} />} */}
      <BattleResults resultBattleData={resultBattleData} />
      {Object.keys(logsData).length !== 0 && <Logs logsData={logsData} />}
    </>
  );
};

export default App;
