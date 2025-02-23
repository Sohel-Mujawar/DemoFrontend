import React, {useState} from 'react';

const IncomeCommission: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Income');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="h-90 overflow-auto bg-white p-4 dark:border-strokedark dark:bg-boxdark">
        <h4 className="text-md font-semibold text-black dark:text-white">
          Income & Commission
        </h4>
        <div className="mb-4 border-b border-b-graydark">
          <ul
            className="-mb-px flex flex-wrap text-center text-sm font-medium"
            id="default-tab"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block rounded-t-lg p-4 ${activeTab === 'Income' ? 'border-primary text-primary dark:text-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                id="Income-tab"
                type="button"
                role="tab"
                onClick={() => handleTabClick('Income')}
                aria-controls="Income"
                aria-selected={activeTab === 'Income'}
              >
                Income
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block rounded-t-lg p-4 ${activeTab === 'Commission' ? 'border-primary text-primary dark:text-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                id="Commission-tab"
                type="button"
                role="tab"
                onClick={() => handleTabClick('Commission')}
                aria-controls="Commission"
                aria-selected={activeTab === 'Commission'}
              >
                Commisssion
              </button>
            </li>
          </ul>
        </div>

        {activeTab == 'Income' && (
          <>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Joining Fee</span>
              <input
                type="text"
                value="100.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Registration Fee</span>
              <input
                type="text"
                value="50.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Renewal</span>
              <input
                type="text"
                value="30.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Package Upgrade</span>
              <input
                type="text"
                value="150.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
          </>
        )}

        {activeTab == 'Commission' && (
          <>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Binary Commission</span>
              <input
                type="text"
                value="200.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Rank Bonus</span>
              <input
                type="text"
                value="75.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Level Commission</span>
              <input
                type="text"
                value="120.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
              <span>Referral</span>
              <input
                type="text"
                value="50.00"
                disabled
                className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IncomeCommission;
