import React from 'react';

const Transactions: React.FC = () => {
  return (
    <>
      <div className="h-90 overflow-auto bg-white p-4 dark:border-strokedark dark:bg-boxdark">
        <h4 className="text-md font-semibold text-black dark:text-white">
          Transactions
        </h4>
        <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
          <div>
            <span className="text-md font-medium text-primary dark:text-gray">
              E-Wallet
            </span>
            <p className="text-sm text-slate-700 dark:text-secondary">
              admin debit
            </p>
          </div>
          <input
            type="text"
            value="100.00"
            disabled
            className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
          <div>
            <span className="text-md font-medium text-primary dark:text-gray">
              E-Wallet
            </span>
            <p className="text-sm text-slate-700 dark:text-secondary">
              admin debit
            </p>
          </div>
          <input
            type="text"
            value="100.00"
            disabled
            className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
          <div>
            <span className="text-md font-medium text-primary dark:text-gray">
              E-Wallet
            </span>
            <p className="text-sm text-slate-700 dark:text-secondary">
              admin debit
            </p>
          </div>
          <input
            type="text"
            value="100.00"
            disabled
            className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
          <div>
            <span className="text-md font-medium text-primary dark:text-gray">
              E-Wallet
            </span>
            <p className="text-sm text-slate-700 dark:text-secondary">
              admin debit
            </p>
          </div>
          <input
            type="text"
            value="100.00"
            disabled
            className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between border-b-2 border-gray py-2 dark:border-graydark">
          <div>
            <span className="text-md font-medium text-primary dark:text-gray">
              E-Wallet
            </span>
            <p className="text-sm text-slate-700 dark:text-secondary">
              admin debit
            </p>
          </div>
          <input
            type="text"
            value="100.00"
            disabled
            className="dark:border-gray-600 w-1/4 rounded-lg border-b border-gray bg-blue-100 bg-transparent text-center font-bold text-primary focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Transactions;
