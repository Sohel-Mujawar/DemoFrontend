import React from 'react';
import {FaUser} from 'react-icons/fa6';
import {useFetchAdminHome} from '@/lib/react-query/Admin/Home/adminHome';
import {useGetCustomer} from '@/lib/react-query/Customer/commision';
import {useAuthContext} from '@/context/AuthContext';
import Loader from '../common/Loader';
const CustomerTeamPerformance: React.FC = () => {
  const {user} = useAuthContext();
  const id = user?.user.id;

  const {data, isLoading, isSuccess} = useGetCustomer(id || '');
  // console.log('Top Performers :', data);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuccess || !data?.topCustomers) {
    return <div>No data available.</div>;
  }

  return (
    <div className="h-90 overflow-auto bg-white p-4 dark:border-strokedark dark:bg-boxdark">
      <h4 className="text-md font-semibold text-black dark:text-white">
        Top Performers
      </h4>
      {data.topCustomers.map((performer) => (
        <div
          key={performer.crnNo}
          className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark"
        >
          <div className="flex items-center">
            <FaUser className="h-4 w-4 rounded-full border-2 text-center" />
            <div className="ml-3">
              <span className="text-md font-medium text-primary dark:text-gray">
                {`${performer.firstName} ${performer.lastName}`}
              </span>
              <p className="text-xs text-slate-700 dark:text-secondary">
                {performer.crnNo}
              </p>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-green-500 dark:text-green-400">
              Pairs: {performer.pairCount}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerTeamPerformance;
