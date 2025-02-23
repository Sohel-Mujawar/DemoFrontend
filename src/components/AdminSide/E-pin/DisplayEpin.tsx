import Loader from '@/components/common/Loader';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {getAdminEpins} from '@/lib/api/Admin/Epin/epin';
import {
  useGetAdminPins,
  useGetAllEPins,
  useGetCustomerEpins,
} from '@/lib/react-query/Admin/Epin/epin';
import React from 'react';
import toast from 'react-hot-toast';

type EpinData = {
  id: string;
  epinNo: string;
  createdAt: string; // ISO date format
  isUsed: boolean;
  usedAt: string | null;
  usedBy: string | null;
};

const EpinColumn: Column<EpinData>[] = [
  {header: 'Created At', accessor: 'createdAt'},
  {header: 'E-Pin No', accessor: 'epinNo'},
  {header: 'Used', accessor: 'isUsed', sortable: true},
  {header: 'Used By', accessor: 'usedBy'},
];

const DisplayEpin: React.FC = () => {
  const {data: epinData, isSuccess, isLoading} = useGetAdminPins();
  const formattedData = isSuccess
    ? Array.isArray(epinData) &&
      epinData.map((epin: EpinData) => ({
        id: epin.id,
        epinNo: epin.epinNo,
        createdAt: new Date(epin.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUsed: epin.isUsed,
        usedAt: epin.usedAt
          ? new Date(epin.usedAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : 'null',
        usedBy: epin.usedBy || '-',
      }))
    : [];
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <GenericTable
          data={formattedData || []}
          columns={EpinColumn}
          itemsPerPage={15}
          searchAble
          title=" Admin E-Pin"
          key={'epin'}
          onCopy={(item: EpinData) => {
            navigator.clipboard.writeText(item.epinNo);
            toast.success('Copied to clipboard');
          }}
        />
      </div>
    </div>
  );
};

export default DisplayEpin;
