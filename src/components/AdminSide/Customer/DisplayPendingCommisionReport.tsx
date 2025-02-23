import React, {useState} from 'react';
import {
  useFetchAdminCommsion,
  usePayCommission,
  usePayCommissionAll,
} from '@/lib/react-query/Admin/Home/commission';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import Loader from '@/components/common/Loader';

type PendingCommission = {
  id: string;
  customerId: string;
  creatrdAt: string;
  amount: number;
  status: 'PENDING';
  details: string;
  type: string;
  payableAmount: number;
  tdsAmount: number;
  bankAccNo: string;
  bankIFSC: string;
  fullname: string;
  phone: string;
};

const DisplayPendingCommisionReport: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useFetchAdminCommsion();
  const {mutate: payCommission} = usePayCommission();
  const {mutate: payAllCommission} = usePayCommissionAll();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayClick = (row: PendingCommission) => {
    payCommission(row.id);
  };

  const handlePayAll = () => {
    setIsModalOpen(true);
  };

  const confirmPayAll = () => {
    payAllCommission();
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleExportPendingToExcel = () => {
    const filteredData = data?.PendingCommitions?.filter(
      (item: PendingCommission) => item.amount > 0,
    ).map((item: PendingCommission) => ({
      'Account No': item.bankAccNo,
      Amount: item.amount,
      Ifsc: item.bankIFSC,
      Details: item.details,
      'Full name': item.fullname,
      Mobile: item.phone,
    }));

    if (filteredData && filteredData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(filteredData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Pending Commissions');
      XLSX.writeFile(wb, 'pending_commissions.xlsx');
    } else {
      console.log('No data available to export.');
    }
  };

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!isSuccess || !data) {
    return <Loader />;
  }

  const pendingData =
    data?.PendingCommitions?.filter(
      (item: PendingCommission) => item.details.toLowerCase() === 'salary',
    ).map((item: PendingCommission) => ({
      ...item,
      creatrdAt: new Date(item.creatrdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    })) || [];

  const mergeDataByBankAccNo = (data: PendingCommission[]) => {
    const mergedData = data.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.bankAccNo === item.bankAccNo);
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        acc.push({...item});
      }
      return acc;
    }, [] as PendingCommission[]);

    return mergedData;
  };
  const mergedData = mergeDataByBankAccNo(pendingData);

  const renderTable = (
    _data: PendingCommission[],
    showButtons: boolean,
    isPending: boolean = false,
  ) => (
    <div className="rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      {isPending && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handlePayAll}
            className="dark:hover:bg-primarydark rounded bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600 dark:bg-primary"
          >
            Pay All
          </button>
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Bank Account No
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Amount
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Bank IFSC
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Details
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Full Name
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Phone
              </th>
              {showButtons && (
                <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {mergedData?.map((row, index) => (
              <tr
                key={index}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="px-4 py-2 text-left">{row.bankAccNo}</td>
                <td className="px-4 py-2 text-left">{row.amount}</td>
                <td className="px-4 py-2 text-left">{row.bankIFSC}</td>
                <td className="px-4 py-2 text-left">{row.details}</td>
                <td className="px-4 py-2 text-left">{row.fullname}</td>
                <td className="px-4 py-2 text-left">{row.phone}</td>
                {showButtons && (
                  <td className="px-4 py-2 text-left">
                    <button
                      onClick={() => handlePayClick(row)}
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                      Pay
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="mb-4 mt-4 text-xl font-bold">Pending Commissions</h1>
      {renderTable(pendingData, true, true)}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExportPendingToExcel}
          className="my-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Export Pending to Excel
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="mx-auto mt-10 max-w-sm rounded bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-999"
      >
        <h2 className="text-lg font-semibold">Confirm Payment</h2>
        <p className="mt-2 text-sm">
          Are you sure you want to pay all commissions?
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={confirmPayAll}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-600 ml-2 rounded px-4 py-2 text-black"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayPendingCommisionReport;
