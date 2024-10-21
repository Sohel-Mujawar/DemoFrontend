import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from '@tanstack/react-router';
import SidebarLinkGroup from './SidebarLinkGroup';
import {SidebarProps} from '@/types';
import {PiSquaresFourLight} from 'react-icons/pi';
import {FaArrowLeftLong} from 'react-icons/fa6';
import {IoIosArrowUp} from 'react-icons/io';

const sidebarRoutes = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <PiSquaresFourLight size={22} />,
  },
  {
    label: 'Sub Routes',
    path: '/dashboard',
    icon: <PiSquaresFourLight size={22} />,
    subRoutes: [
      {
        label: 'Sub Route 1',
        path: '/dashboard',
      },
    ],
  },
];

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const location = useLocation();
  const {pathname} = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const {target} = event;

      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">
          <img src={'Logo'} alt="Logo" />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FaArrowLeftLong className="fill-current" size={20} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarRoutes.map((route, index) =>
                route.subRoutes ? (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={pathname.includes(route.path!)}
                  >
                    {(handleClick, open) => (
                      <>
                        <Link
                          to=""
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes(route.path!) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          {route.icon}
                          {route.label}
                          <IoIosArrowUp
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            size={20}
                          />
                        </Link>
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            {route.subRoutes.map((subRoute, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subRoute.path}
                                  className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                  activeProps={{className: '!text-white'}}
                                >
                                  {subRoute.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </SidebarLinkGroup>
                ) : (
                  <li key={index}>
                    <Link
                      to={route.path}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes(route.path) &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
