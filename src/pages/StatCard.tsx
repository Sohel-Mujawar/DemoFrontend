import React from 'react';

type StatCardProps = {
  amount: string;
  title: string;
  icon: React.ReactNode; // Allows passing an icon component
};

const StatCard: React.FC<StatCardProps> = ({amount, title, icon}) => {
  return (
    <div className="dark:bg-gray-800 bg-white p-4 shadow-default dark:bg-black">
      <div className="flex items-center justify-between">
        <div className="dark:bg-gray-700 flex h-10 w-10 items-center justify-center rounded-full bg-gray dark:bg-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-800 text-xl font-semibold dark:text-white">
          {amount}
        </p>
        <div className="align-center flex flex-row justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
