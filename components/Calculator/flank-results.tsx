import { FlankRow } from '@/function/battle';
import React from 'react';

interface FlankResults {
  flank: [FlankRow];
}

const FlankResults = ({ flank }: FlankResults) => {
  const flankResults = flank?.map((squad: FlankRow, index: number) => {
    if (squad.squadUnit.squadNumber === 0) {
      return (
        <div
          key={`${index}`}
          className="flex justify-center px-2 text-gray-300"
        >
          -
        </div>
      );
    } else {
      return (
        <div key={`${squad.squadUnit.id}-${index}`} className="flex flex-wrap">
          <span key={`${index}${squad.squadUnit.name}`} className="px-2 w-48">
            {squad.squadUnit.name}
          </span>
          <span className="text-white">-</span>
          <span
            key={`${index}${squad.squadUnit.squadNumber}start`}
            className="px-2 w-12 text-right"
          >
            {Math.round(squad.squadUnit.squadNumber)}
          </span>
          <span className="text-white">-</span>
          <span
            key={`${index}${squad.squadUnit.squadAlive}died`}
            className="px-2 text-green-600 w-12 text-right"
          >
            {Math.round(squad.squadUnit.squadAlive)}
          </span>
          <span className="text-white">-</span>
          <span
            key={`${index}${squad.squadUnit.squadLosses}survived`}
            className="px-2 text-red-600 w-12 text-right"
          >
            {Math.round(squad.squadUnit.squadLosses)}
          </span>
        </div>
        // <div key={`${squad.squadUnit.id}-${index}`}>
        //   <span
        //     key={`${index}${squad.squadUnit.name}`}
        //     className="px-2 block w-32"
        //   >
        //     {squad.squadUnit.name}
        //   </span>
        //   <span className="text-white">-</span>
        //   <span
        //     key={`${index}${squad.squadUnit.squadNumber}start`}
        //     className="px-2 "
        //   >
        //     {squad.squadUnit.squadNumber}
        //   </span>
        //   <span className="text-white">-</span>
        //   <span
        //     key={`${index}${squad.squadUnit.squadAlive}died`}
        //     className="px-2 text-green-600"
        //   >
        //     {squad.squadUnit.squadAlive}
        //   </span>
        //   <span className="text-white">-</span>
        //   <span
        //     key={`${index}${squad.squadUnit.squadLosses}survived`}
        //     className="px-2 text-red-600"
        //   >
        //     {squad.squadUnit.squadLosses}
        //   </span>
        // </div>
      );
    }
  });

  return <>{flankResults}</>;
};

export default FlankResults;
