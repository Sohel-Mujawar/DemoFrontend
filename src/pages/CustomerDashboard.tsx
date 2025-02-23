import React, {useEffect, useState} from 'react';
import {IoTodaySharp, IoWalletSharp} from 'react-icons/io5';
import {
  PiAlignLeftSimpleDuotone,
  PiAlignRightSimpleDuotone,
  PiNumberCircleEightBold,
} from 'react-icons/pi';
import StatCard from './StatCard';
import {useAuthContext} from '@/context/AuthContext';
import CustomerTeamPerformance from '@/components/Charts/CustomerTeamPerformance';
import CustomerNewMember from '@/components/Charts/CustomerNewMember';
import {useGetBanners} from '@/lib/react-query/Customer/banner';
import {
  useFetchCustomerHome,
  useGetCustomerById,
} from '@/lib/react-query/Customer/home';
import Loader from '@/components/common/Loader';
import Popup from '@/components/Popu/Popup';
import {FaDollarSign} from '@/icons';
import {BiPurchaseTag} from 'react-icons/bi';

interface StatCardProps {
  amount: string;
  title: string;
  icon: React.ReactNode;
}
interface Customer {
  crnNo: string;
  firstName: string;
  lastName: string;
  pairCount: number;
  createdAt?: string;
}

const CustomerDashboard: React.FC = () => {
  const {user} = useAuthContext();
  const id = user?.user.id;

  const {
    data: dataa,
    isError,
    isPending,
    refetch,
    isSuccess,
  } = useFetchCustomerHome(id as string);

  const {data: banners = [], isLoading, isError: bannerError} = useGetBanners();
  const [statsData, setStatsData] = useState<StatCardProps[]>([]);
  const [lastCustomers, setLastCustomers] = useState<Customer[]>([]);
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showExtraBoxes, setShowExtraBoxes] = useState(false);

  const [isPopup, setIsPopup] = useState(false);
  // console.log(data?.customer);

  useEffect(() => {
    const isAnyFieldNull = dataa?.customer.bankAccNo === null;
    console.log(isAnyFieldNull);

    setIsPopup(isAnyFieldNull);
  }, [dataa, isSuccess]);

  const handlePopupClose = () => {
    setIsPopup(false); // Close the popup
  };

  const handleToggle = () => {
    setShowExtraBoxes(!showExtraBoxes);
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    if (isSuccess && dataa) {
      setStatsData([
        {
          title: 'Paid Commissions',
          amount: `${dataa.MyCommission || 0}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Pending Commission',
          amount: `${dataa?.totalPendingCommission}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        // {
        //   title: 'Total Pairs',
        //   amount: `${data.count || 0}`,
        //   icon: <PiNumberCircleEightBold className="text-2xl" />,
        // },
        {
          title: "Today's Pairs",
          amount: `${(dataa?.customer.amPairs || 0) + (dataa?.customer.pmPairs || 0)}`,
          icon: <IoTodaySharp className="text-2xl" />,
        },
        {
          title: 'Left Side Customers',
          amount: `${dataa?.customer.leftCount || 0}`,
          icon: <PiAlignLeftSimpleDuotone className="text-2xl" />,
        },
        {
          title: 'Right Side Customers',
          amount: `${dataa?.customer.rightCount || 0}`,
          icon: <PiAlignRightSimpleDuotone className="text-2xl" />,
        },
        {
          title: 'Total Repurchases Commission',
          amount: `${dataa?.totalrepurchaseCommission || 0}`,
          icon: <BiPurchaseTag className="text-2xl" />,
        },
      ]);

      setLastCustomers(dataa.lastCustomers || []);
      setTopCustomers(dataa.topCustomers || []);
    }
  }, [isSuccess, dataa]);

  useEffect(() => {
    if (isError || bannerError) {
      setError(true);
    }
  }, [isError, bannerError]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 300);
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        banners.length ? (prevIndex + 1) % banners.length : 0,
      );
    }, 500);
    return () => clearInterval(interval);
  }, [banners]);

  useEffect(() => {
    if (!isPopup) {
      refetch();
    }
  }, [isPopup, refetch]);
  if (isPending || isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          An error occurred while fetching data.
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <>
      {isPopup ? (
        <Popup onClose={handlePopupClose} />
      ) : (
        <div>
          {/* Banner Section */}
          {banners.length > 0 && (
            <div className="bg-gray-100 relative overflow-hidden">
              <div className="w-full">
                <img
                  src={banners[currentBannerIndex]?.image}
                  alt={`Banner ${currentBannerIndex + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`h-3 w-3 rounded-full ${
                      index === currentBannerIndex
                        ? 'bg-purple-700'
                        : 'bg-gray-300'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {statsData
              .slice(0, showExtraBoxes ? statsData.length : 4)
              .map((stat, index) => (
                <StatCard
                  amount={stat.amount}
                  icon={stat.icon}
                  title={stat.title}
                  key={index}
                />
              ))}
          </div>
          {!showExtraBoxes ? (
            <button
              onClick={handleToggle}
              className="mt-4 flex items-center text-blue-600"
            >
              <span>Show More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggle}
              className="mt-4 flex items-center text-blue-600"
            >
              <span>Show Less</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          )}

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 md:col-span-6">
              <CustomerNewMember />
            </div>
            <div className="col-span-12 md:col-span-6">
              <CustomerTeamPerformance />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDashboard;
