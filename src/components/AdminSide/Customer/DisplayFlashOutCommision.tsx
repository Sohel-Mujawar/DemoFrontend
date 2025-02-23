import React, {useState} from 'react';
import {useFetchAdminCommsion} from '@/lib/react-query/Admin/Home/commission';
import Modal from 'react-modal';
import Loader from '@/components/common/Loader';

type PendingCommission = {
  id: string;
  amount: number;
  details: string;
  bankAccNo: string;
  bankIFSC: string;
  fullname: string;
  phone: string;
};

const DisplayFlashOutCommission: React.FC = () => {
  const {data, isSuccess, isError} = useFetchAdminCommsion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<PendingCommission | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!isSuccess || !data) {
    return <Loader />;
  }

  // Filter data to include only "fleshout" records
  const flashOutData = data?.PendingCommitions?.filter(
    (item: PendingCommission) => item.details.toLowerCase() === 'fleshout',
  );

  const renderTable = (_data: PendingCommission[]) => (
    <div className="rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
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
            </tr>
          </thead>
          <tbody>
            {newEntry && (
              <tr
                key={newEntry.id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="px-4 py-2 text-left">{newEntry.bankAccNo}</td>
                <td className="px-4 py-2 text-left">{newEntry.amount}</td>
                <td className="px-4 py-2 text-left">{newEntry.bankIFSC}</td>
                <td className="px-4 py-2 text-left">{newEntry.details}</td>
                <td className="px-4 py-2 text-left">{newEntry.fullname}</td>
                <td className="px-4 py-2 text-left">{newEntry.phone}</td>
              </tr>
            )}
            {_data
              .slice((pageNumber - 1) * 7, pageNumber * 7)
              .map((row, index) => (
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
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          {pageNumber > 1 && (
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              className="bg-gray-500 mr-4 rounded px-4 py-2 text-white"
            >
              Previous
            </button>
          )}
          {flashOutData.length > pageNumber * 7 && (
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              className="bg-gray-500 rounded px-4 py-2 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="mb-4 mt-4 text-xl font-bold">Flesh Out Commissions</h1>
      {flashOutData && flashOutData.length > 0 ? (
        renderTable(flashOutData)
      ) : (
        <div>No flesh-out data available.</div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="mx-auto mt-10 max-w-sm rounded bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-999"
      >
        <h2 className="text-lg font-semibold">Modal Title</h2>
        <button
          onClick={closeModal}
          className="bg-gray-500 hover:bg-gray-600 mt-4 rounded px-4 py-2 text-white"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default DisplayFlashOutCommission;
