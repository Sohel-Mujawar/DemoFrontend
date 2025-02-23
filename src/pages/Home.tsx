import React, {useEffect, useState} from 'react';
import {IoWalletSharp} from 'react-icons/io5';
import {FaDollarSign, FaShoppingBasket} from 'react-icons/fa';
import StatCard from './StatCard';
import {useFetchAdminHome} from '@/lib/react-query/Admin/Home/adminHome';
import NewMembers from '@/components/Charts/NewMembers';
import TeamPerformance from '@/components/Charts/TeamPerformance';
import ChartOne from '@/components/Charts/ChartOne';
import Loader from '@/components/common/Loader';
import {useGetCustomerById} from '@/lib/react-query/Customer/home';
import {useAuthContext} from '@/context/AuthContext';

interface StatCardProps {
  amount: string;
  title: string;
  icon: React.ReactNode;
}

const Home: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useFetchAdminHome();
  // console.log('Admin Daata :', data);
  const {user} = useAuthContext();
  const id = user?.user.id;
  // const {data: customer} = useGetCustomerById(id as string);

  const [statsData, setStatsData] = useState<StatCardProps[]>([]);
  const [showExtraBoxes, setShowExtraBoxes] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      // console.log('data', data);
      setStatsData([
        {
          title: 'Total Income',
          amount: `${data.totalIncome.toFixed(2)}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Total Sales',
          amount: `${data.totalSales.toFixed(2)}`,
          icon: <FaShoppingBasket className="text-2xl" />,
        },
        {
          title: 'Total Commission',
          amount: `${data.totalCommission.toFixed(2)}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Total Customers',
          amount: `${data.totalCustomers.length}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Total Product Sold',
          amount: `${data.totalCustomers.length}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Silver Binary Income',
          amount: `${data.commissionCountAndSumByType?.[0]?._sum?.amount.toFixed(2) || '0.00'}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Gold Binary Income',
          amount: `${data.commissionCountAndSumByType?.[1]?._sum?.amount.toFixed(2) || '0.00'}`,
          icon: <FaShoppingBasket className="text-2xl" />,
        },
        {
          title: 'Pending Pairs',
          amount: `${data.totalPendingPairs.toFixed(2)}`,
          icon: <IoWalletSharp className="text-2xl" />,
        },
        {
          title: 'Pair Cutted',
          amount: `${data.WastedPairs}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Single Cutted',
          amount: `${data.Wastedsingles}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Total Repurchase Amount',
          amount: `${parseFloat(data.totalrepurchaseincome).toFixed(2)}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
        {
          title: 'Total Repurchase Count',
          amount: `${data.repurchaseCount}`,
          icon: <FaDollarSign className="text-2xl" />,
        },
      ]);
    }
  }, [isSuccess, data, isPending]);

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  if (isPending) {
    return <Loader />;
  }

  const handleToggle = () => {
    setShowExtraBoxes(!showExtraBoxes);
  };

  const displayedStats = showExtraBoxes ? statsData : statsData.slice(0, 8);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {displayedStats.map((stat, index) => (
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
        <div className="col-span-12 md:col-span-12">
          <ChartOne />
        </div>
        <div className="col-span-12 md:col-span-6">
          <NewMembers />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TeamPerformance />
        </div>
      </div>
    </div>
  );
};

export default Home;
