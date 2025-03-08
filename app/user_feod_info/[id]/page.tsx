'use client';
import FeodFinance from '@/app/components/feodfinance';
import FeodGarrison from '@/app/components/feodgarrison';
import FeodLeftMenu from '@/app/components/feodleftmenu';
import FeodNavigation from '@/app/components/feodnavigation';
import FeodNonUserSquad from '@/app/components/feodnonusersquad';
import FeodResources from '@/app/components/feodresources';
import FeodWorker from '@/app/components/feodwarker';
import UserSquads from '@/app/components/usersquads';
import Header from '@/components/Header/header';
import { useState } from 'react';

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [feodNumber, setFeodNumber] = useState(1);
  const [subPage, setSubPage] = useState('resourse' as any);

  return (
    <>
      <Header />
      {/* Верхнее подменю */}
      <nav
        className="mx-auto flex  items-center justify-center p-2 "
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={() => setSubPage('resourse')}
            className={`text-sm/6 text-gray-900 ${
              subPage == 'resourse' && 'font-semibold'
            } `}
          >
            Рабочие и добыча
          </button>
          <button
            onClick={() => setSubPage('finance')}
            className={`text-sm/6 text-gray-900 ${
              subPage == 'finance' && 'font-semibold'
            } `}
          >
            Снабжение и налоги
          </button>
          <button
            onClick={() => setSubPage('squad')}
            className={`text-sm/6 text-gray-900 ${
              subPage == 'squad' && 'font-semibold'
            } `}
          >
            Гарнизон и отряды
          </button>
          <button
            onClick={() => setSubPage('navigation')}
            className={`text-sm/6 text-gray-900 ${
              subPage == 'navigation' && 'font-semibold'
            } `}
          >
            Соседние владения
          </button>
        </div>
      </nav>
      {/* Боковое меню */}
      <FeodLeftMenu
        params={{
          id: params.id,
        }}
        setFeodNumber={setFeodNumber}
      />
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
        <FeodFinance
          params={{
            id: params.id,
          }}
          feodNumber={feodNumber}
        />
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

      {/* Таблица Войск */}
      {subPage == 'squad' && (
        <>
          <FeodGarrison
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
          <br></br>
          <FeodNonUserSquad
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
