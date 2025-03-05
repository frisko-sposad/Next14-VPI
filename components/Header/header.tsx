import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <>
      <nav
        className="mb-5 flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <ul
              className="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li>
                <Link
                  href="/user_feod_info/2"
                  className="block transition text-green-500 hover:text-blue-500 lg:p-2"
                >
                  <h2>Феоды</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/battle-calculator"
                  className="block transition hover:text-blue-500 lg:p-2"
                >
                  <h2>Battle calculator</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/stats_units"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>Units</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/price_units"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>Price</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/stats_feods"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>Feods</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/stats_heroes"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>Heroes</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/stats_fortifications"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>Fortifications</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>Map</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/user_map/55"
                  className="block transition text-gray-300 hover:text-blue-500 lg:p-2"
                >
                  <h2>User Map</h2>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul
              className="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li>
                <Link
                  href="/admin/admin_page"
                  className="block transition text-red-500 hover:text-blue-500 lg:p-2"
                >
                  <h2>Admin:</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/add_user"
                  className="block transition text-red-500 hover:text-blue-500 lg:p-2"
                >
                  <h2>Add User</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/users_show"
                  className="block transition text-red-500 hover:text-blue-500 lg:p-2"
                >
                  <h2>Show Users</h2>
                </Link>
              </li>
              <li>
                <Link
                  href="/feods/3"
                  className="block transition text-red-500 hover:text-blue-500 lg:p-2"
                >
                  <h2>Feods Edit</h2>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
