import {Outlet} from '@tanstack/react-router';
import MenuBook from '../assets/images/logo/Menubook.png';
import React from 'react';

const AuthLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <img className="w-full dark:hidden" src={MenuBook} alt="Logo" />
          </div>
        </div>
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
