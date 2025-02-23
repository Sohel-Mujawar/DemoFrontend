import React from 'react';
import {FaUser} from 'react-icons/fa6';
import {useFetchAdminHome} from '@/lib/react-query/Admin/Home/adminHome';

const NewMembers: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useFetchAdminHome();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading new members.</div>;
  }

  if (!isSuccess || !data?.newJoinees) {
    return <div>No data available.</div>;
  }

  // Sort newJoinees by CRN number in descending order
  const sortedNewJoinees = [...data.newJoinees].sort((a, b) =>
    b.crnNo.localeCompare(a.crnNo),
  );

  return (
    <div className="h-90 overflow-auto bg-white p-4 dark:border-strokedark dark:bg-boxdark">
      <h4 className="text-md font-semibold text-black dark:text-white">
        New Members
      </h4>
      {sortedNewJoinees.map((member) => (
        <div
          key={member.crnNo}
          className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark"
        >
          <div className="flex items-center">
            <FaUser className="h-4 w-4 rounded-full border-2 text-center" />
            <div className="ml-3">
              <span className="text-md font-medium text-primary dark:text-gray">
                {`${member.firstName} ${member.lastName}`}
              </span>
              <p className="text-xs text-slate-700 dark:text-secondary">
                {member.crnNo}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewMembers;
