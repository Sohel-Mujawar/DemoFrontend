/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {useGetEpins} from '@/lib/react-query/Customer/epin';
import {useAuthContext} from '@/context/AuthContext';
import GenericTable from '@/components/Forms/Table/GenericTable';
import Loader from '@/components/common/Loader';
import toast from 'react-hot-toast';

const DisplayEpinUser: React.FC = () => {
  const {user} = useAuthContext();
  const {data: epinsData, isLoading, error} = useGetEpins(user?.user.id || '');

  const [availableEpins, setAvailableEpins] = useState<any[]>([]);
  const [usedEpins, setUsedEpins] = useState<any[]>([]);

  useEffect(() => {
    if (epinsData) {
      // Map and format available epins
      const formattedAvailableEpins = epinsData.AvailabaleEpins.map(
        (epin: any) => ({
          epinNo: epin.epinNo,
          createdAt: epin.createdAt
            ? new Date(epin.createdAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : 'null',
        }),
      );
      setAvailableEpins(formattedAvailableEpins);

      // Map and format used epins
      const formattedUsedEpins = epinsData.usedEpins.map((epin: any) => ({
        epinNo: epin.epinNo,
        assignedToId: epin.assignedToId,
        createdAt: epin.createdAt
          ? new Date(epin.createdAt).toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : 'null',
        requestId: epin.requestId,
        usedAt: epin.usedAt
          ? new Date(epin.usedAt).toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : 'null',
        usedBy: epin.usedBy,
      }));
      setUsedEpins(formattedUsedEpins);
    }
  }, [epinsData]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error fetching ePin data.</p>;
  }

  const availableEpinsColumns = [
    {header: 'Created At', accessor: 'createdAt'},
    {header: 'Epin Number', accessor: 'epinNo'},
  ];

  const usedEpinsColumns = [
    {header: 'Created At', accessor: 'createdAt'},
    {header: 'Epin Number', accessor: 'epinNo'},
    {header: 'Used At', accessor: 'usedAt'},
    {header: 'Used By', accessor: 'usedBy'},
  ];

  return (
    <div>
      <div>
        <GenericTable
          title="Available Epins"
          itemsPerPage={5}
          data={availableEpins}
          columns={availableEpinsColumns}
          onCopy={(item: {epinNo: string}) => {
            navigator.clipboard.writeText(item.epinNo);
            toast.success('Copied to clipboard');
          }}
        />
      </div>
      <div style={{marginTop: '2rem'}}>
        <GenericTable
          title="Used Epins"
          data={usedEpins}
          columns={usedEpinsColumns}
        />
      </div>
    </div>
  );
};

export default DisplayEpinUser;
