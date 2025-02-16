import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
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
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Home</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/users_show"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">users_show</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/user/40"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">User info</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/user_squads/40"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Squad_info</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/feods/3"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Feods_edit</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/feods_info/2"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Feods_info</h2>
              </Link>
            </li>
            <li>
              <Link
                href="/add_user"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Add User</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/battle-calculator"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Battle calculator</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/stats_units"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Units</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/price_units"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Price</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/stats_feods"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Feods</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/stats_heroes"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Heroes</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/stats_fortifications"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Fortifications</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/map"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2>Map</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/user_map/55"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
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
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/admin/admin_page"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Admin</h2>
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <Link
                href="/admin/users"
                className="block transition duration-150 ease-in-out hover:text-blue-500 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              >
                <h2 className="text-red-500">Users</h2>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
