import React from 'react';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetCustomerEpins} from '@/lib/react-query/Admin/Epin/epin';
import toast from 'react-hot-toast';

type CustomerEpinData = {
  id: string;
  epinNo: string;
  assignedToId: string;
  createdAt: string;
  isUsed: boolean;
  usedAt: string | null;
  requestId: string;
  usedBy: string | null;
  customer: {
    firstName: string;
    lastName: string;
    crnNo: string;
  };
};
const CustomerEpinColumn: Column<CustomerEpinData>[] = [
  {header: 'Created At', accessor: 'createdAt'},
  {header: 'E-Pin No', accessor: 'epinNo'},
  {header: 'Used', accessor: 'isUsed', sortable: true},
  {header: 'Used By', accessor: 'usedBy'},
  {
    header: 'Customer Name',
    accessor: (row) =>
      `${row.customer?.firstName || ''} ${row.customer?.lastName || ''}`,
  },
  {header: 'Customer ID', accessor: (row) => row.customer?.crnNo || ''},
];

const CustomerEpins: React.FC = () => {
  const {
    data: CustomerepinData,
    isSuccess: customerEpinSuccess,
    isLoading,
  } = useGetCustomerEpins();
  // console.log('customer Eping data : ', CustomerepinData);

  const CustomerFormattedData = customerEpinSuccess
    ? Array.isArray(CustomerepinData) &&
      CustomerepinData.map((epin: CustomerEpinData) => ({
        ...epin, // Retain all original properties
        usedBy: epin.usedBy || '-',
        isUsed: epin.isUsed, // <--- Change this line
        createdAt: new Date(epin.createdAt).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        usedAt: epin.usedAt
          ? new Date(epin.usedAt).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : 'null',
      }))
    : [];
  return (
    <div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <GenericTable
          data={CustomerFormattedData || []}
          columns={CustomerEpinColumn}
          itemsPerPage={15}
          searchAble
          title="Customers E-Pin"
          key="epin"
          onCopy={(item: CustomerEpinData) => {
            navigator.clipboard.writeText(item.epinNo);
            toast.success('Copied to clipboard');
          }}
        />
      )}
    </div>
  );
};

export default CustomerEpins;
