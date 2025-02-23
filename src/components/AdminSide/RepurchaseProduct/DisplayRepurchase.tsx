/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import Loader from '@/components/common/Loader';
import {useGetAllRePurchase} from '@/lib/react-query/Admin/RepurchaseProduct/repurchaseproduct';

const DisplayRepurchase: React.FC = () => {
  const {data: repurchaseData, isSuccess, isLoading} = useGetAllRePurchase();
  // console.log('repurchaseData', repurchaseData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  if (isLoading) {
    return <Loader />;
  }

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setIsModalOpen(false);
  };

  const confirmedData = isSuccess
    ? repurchaseData.filter((item) => item.status === 'CONFIRMED')
    : [];

  const cancelledData = isSuccess
    ? repurchaseData.filter((item) => item.status === 'CANCELLED')
    : [];

  const renderTable = (title: string, data: any[]) => (
    <div className="mb-6 rounded-sm bg-white px-5 pb-2.5 pt-6 shadow-default dark:bg-boxdark">
      <h2 className="mb-4 text-xl font-bold dark:text-white">{title}</h2>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="px-4 py-2 font-medium text-black dark:text-white">
                Date & Time
              </th>
              <th className="px-4 py-2 font-medium text-black dark:text-white">
                Customer Name
              </th>
              <th className="px-4 py-2 font-medium text-black dark:text-white">
                Customer City
              </th>
              <th className="px-4 py-2 font-medium text-black dark:text-white">
                CRN
              </th>
              <th className="px-4 py-2 font-medium text-black dark:text-white">
                Requested Amount
              </th>
              <th className="px-4 py-2 font-medium text-black dark:text-white">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-boxhoverdark"
              >
                <td className="px-4 py-2 dark:text-white">
                  {new Date(item.createdAt).toLocaleString('en-US')}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {item.customer?.firstName} {item.customer?.lastName}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {item.customer?.city}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {item.customer?.crnNo}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  ₹{item.paidAmount}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="Request"
                      className="h-12 w-12 cursor-pointer rounded object-contain"
                      onClick={() => openModal(item.image)}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      {renderTable('Confirmed Repurchase Requests', confirmedData)}
      {renderTable('Cancelled Repurchase Requests', cancelledData)}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Large View"
              className="max-h-[90vh] max-w-full rounded shadow-lg"
            />
            <button
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayRepurchase;
