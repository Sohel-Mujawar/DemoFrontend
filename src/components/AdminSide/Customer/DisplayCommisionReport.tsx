import React, {useState} from 'react';
import {
  useGetAdminPaidCommission,
  usePayCommission,
  usePayCommissionAll,
} from '@/lib/react-query/Admin/Home/commission';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import Loader from '@/components/common/Loader';

type PaidCommission = {
  id: string;
  customerId: string;
  creatrdAt: string;
  amount: number;
  status: 'PAID';
  details: string;
  type: string;
  pairType: string | null;
  payableAmount: number;
  tdsAmount: number;
  bankAccNo: string;
  bankIFSC: string;
  fullname: string;
  phone: string;
};

const DisplayCommisionReport: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useGetAdminPaidCommission();
  // console.log('paid commmision :', data);
  const {mutate: payCommission} = usePayCommission();
  const {mutate: payAllCommission} = usePayCommissionAll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(data);

  const handlePayClick = (row: PaidCommission) => {
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

  const handleExportPaidToExcel = () => {
    const filteredData = data?.PaidCommitions?.map((item: PaidCommission) => ({
      'Account No': item.bankAccNo,
      Amount: item.amount,
      Ifsc: item.bankIFSC,
      Details: item.details,
      'Full name': item.fullname,
      Mobile: item.phone,
    }));
    if (filteredData) {
      const ws = XLSX.utils.json_to_sheet(filteredData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Paid Commissions');
      XLSX.writeFile(wb, 'paid_commissions.xlsx');
    }
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <Loader />;
  }

  const paidData =
    data.PaidCommitions?.map((item: PaidCommission) => ({
      id: item.id,
      amount: item.amount,
      status: item.status,
      details: item.details,
      type: item.type,
      pairType: item.pairType,
      payableAmount: item.payableAmount,
      tdsAmount: item.tdsAmount,
      bankAccNo: item.bankAccNo,
      bankIFSC: item.bankIFSC,
      fullname: item.fullname,
      phone: item.phone,
    })) || [];

  const renderTable = (
    data: PaidCommission | [],
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
                Fullname
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
            {Array.isArray(data) &&
              data.map((item: PaidCommission, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 === 0
                      ? 'bg-white dark:bg-boxdark'
                      : 'bg-gray-50 dark:bg-boxlight'
                  }
                >
                  <td className="px-4 py-5 dark:border-strokedark">
                    {item.bankAccNo}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark">
                    {item.amount}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark">
                    {item.bankIFSC}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark">
                    {item.details}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark">
                    {item.fullname}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark">
                    {item.phone}
                  </td>
                  {showButtons && (
                    <td className="px-4 py-5 dark:border-strokedark">
                      <button
                        onClick={() => handlePayClick(item)}
                        className="dark:hover:bg-primarydark rounded bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600 dark:bg-primary"
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
      <h1 className="mb-4 mt-4 text-xl font-bold">Paid Commissions</h1>
      {renderTable(paidData, false)}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExportPaidToExcel}
          className="my-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Export Paid to Excel
        </button>
      </div>

      {/* Modal */}
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

export default DisplayCommisionReport;
