import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from '@tanstack/react-router';
import SidebarLinkGroup from './SidebarLinkGroup';
import {SidebarProps} from '@/types';
import {PiNavigationArrowFill, PiSquaresFourLight} from 'react-icons/pi';
import {FaArrowLeftLong} from 'react-icons/fa6';
import {IoIosArrowDown} from 'react-icons/io';
import {
  NetworkIcon,
  ProfileIcon,
  RegistrationIcon,
  ReportIcon,
  WalletIcon,
} from '@/icons';
import {useAuthContext} from '@/context/AuthContext';
import {BiLogoProductHunt, BiRupee} from 'react-icons/bi';
import Logo from '../../../public/logo.png';
import {MdEmail, MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {GrProductHunt} from 'react-icons/gr';

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const {user} = useAuthContext();

  const role = user?.user.role;

  const sidebarRoutes =
    role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            path: '/dashboard',
            icon: <PiSquaresFourLight size={22} />,
          },
          {
            label: 'Network',
            path: '/admin/network',
            icon: <NetworkIcon size={22} />,
          },
          {
            label: 'Registeration',
            path: '/admin/customerregister',
            icon: <RegistrationIcon size={22} />,
          },

          {
            label: 'Customer List',
            path: '/admin/customerlist',
            icon: <PiSquaresFourLight size={22} />,
          },
          {
            label: 'Epin Request',
            path: '/admin/epinrequest',
            icon: <PiSquaresFourLight size={22} />,
          },
          {
            label: 'Share Link',
            path: '/admin/sharelink',
            icon: <PiSquaresFourLight size={22} />,
          },

          {
            label: 'Sales Report',
            path: '/admin/productsalesreport',
            icon: <ReportIcon size={22} />,
          },
          {
            label: 'Repurchase Report',
            path: '/admin/repurchaseproduct',
            icon: <BiRupee size={22} />,
          },
          {
            label: 'Banner',
            path: '/admin/banner',
            icon: <PiNavigationArrowFill size={22} />,
          },
          {
            label: 'Payout',
            path: '/admin/commisionreport',
            icon: <BiRupee size={22} />,
            subRoutes: [
              {
                label: 'Paid Commission ',
                path: '/admin/commisionreport',
              },
              {
                label: 'Pending Commission ',
                path: '/admin/pendingcommisionreport',
              },
              {
                label: 'Flashout Commission ',
                path: '/admin/flashoutcommision',
              },
            ],
          },

          {
            label: 'E-Pin',
            icon: <PiSquaresFourLight size={22} />,
            subRoutes: [
              {
                label: 'Admin E-Pin',
                path: '/admin/Epin',
              },
              {
                label: 'Customer E-Pin',
                path: '/admin/customerepin',
              },
            ],
          },
          {
            label: 'Change Email',
            path: '/admin/editemail',
            icon: <MdEmail size={22} />,
          },
        ]
      : // Customer
        role === 'CUSTOMER'
        ? [
            {
              label: 'Dashboard',
              path: '/customer/dashboard',
              icon: <PiSquaresFourLight size={22} />,
            },
            {
              label: 'Registeration',
              path: '/customer/customerregisterc',
              icon: <RegistrationIcon size={22} />,
            },
            {
              label: 'Customer Profile',
              path: '/customer/customerprofilec',
              icon: <ProfileIcon size={22} />,
            },
            {
              label: 'Network',
              path: '/customer/networkc',
              icon: <NetworkIcon size={22} />,
            },
            {
              label: 'Report',
              path: '/customer/reportc',
              icon: <ReportIcon size={22} />,
            },
            {
              label: 'Share Link',
              path: '/customer/customersidesharelink',
              icon: <PiSquaresFourLight size={22} />,
            },
            {
              label: 'E-Pin',
              path: '/customer/epinc',
              icon: <PiNavigationArrowFill size={22} />,
            },
            {
              label: 'Repurchase Product',
              path: '/customer/repurchaseproduct',
              icon: <MdOutlineProductionQuantityLimits size={22} />,
            },
          ]
        : [];

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
      <div className="flex items-center justify-center gap-2 px-6 pt-4">
        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 flex h-16 w-auto items-center justify-start space-x-4 rounded-full px-4 py-2 transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray">
            <img src={Logo} alt="Logo" className="object-contain" width={30} />
          </div>
          <h1 className="text-lg font-semibold text-gray">TMS Success</h1>
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
                          <IoIosArrowDown
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
