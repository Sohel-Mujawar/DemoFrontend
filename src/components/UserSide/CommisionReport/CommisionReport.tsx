import Loader from '@/components/common/Loader';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useAuthContext} from '@/context/AuthContext';
import {useGetCommission} from '@/lib/react-query/Customer/commision';
import {Column} from '@/types';
import React, {useEffect, useState} from 'react';

type Data = {
  DataTime: string;
  SilverBinaryIncome: number;
  GoldBinaryIncome: number;
  RepurchaseIncome: number;
  AdminCharges: number;
  TotalIncome: number;
  Status: string;
};

const CommissionReport: React.FC = () => {
  const {user} = useAuthContext();
  const id = user?.user.id;

  const {data: apiData, isLoading, error} = useGetCommission(id as string);
  // console.log('apiData', apiData);
  const [commissionData, setCommissionData] = useState<Data[]>([]);

  const commissionColumns: Column<Data>[] = [
    {
      header: 'Date Time',
      accessor: 'DataTime',
    },
    {
      header: 'Silver Binary Income',
      accessor: 'SilverBinaryIncome',
    },
    {
      header: 'Gold Binary Income',
      accessor: 'GoldBinaryIncome',
    },
    {
      header: 'Repurchase Income',
      accessor: 'RepurchaseIncome',
    },
    {
      header: 'Admin Charges',
      accessor: 'AdminCharges',
    },
    {
      header: 'Total Income',
      accessor: 'TotalIncome',
    },
    {
      header: 'Status',
      accessor: 'Status',
    },
  ];
  useEffect(() => {
    if (apiData) {
      // Map the API response to the required data structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = apiData.map((item: any) => ({
        DataTime: new Date(item.creatrdAt).toLocaleString(),
        SilverBinaryIncome: item.amount || 0,
        GoldBinaryIncome: 0, // Assuming no data is provided for this field in your response
        RepurchaseIncome: 0, // Adjust as needed
        AdminCharges: item.tdsAmount || 0,
        TotalIncome: item.payableAmount || 0,
        Status: item.status,
      }));
      setCommissionData(mappedData);
    }
  }, [apiData]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error fetching commission data.</p>;
  }

  return (
    <div>
      <h1 className="mb-4 mt-4 text-xl font-bold">Commission Report</h1>
      <GenericTable columns={commissionColumns} data={commissionData} />
    </div>
  );
};

export default CommissionReport;
