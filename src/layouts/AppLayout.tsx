import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import {useAuthContext} from '@/context/AuthContext';
import {Navigate, Outlet} from '@tanstack/react-router';
import React, {useState} from 'react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const {isAuthenticated} = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/landing" />;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
