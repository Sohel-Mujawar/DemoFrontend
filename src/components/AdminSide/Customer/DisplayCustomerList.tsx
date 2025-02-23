import React, {useEffect, useState} from 'react';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {useGetCustomer} from '@/lib/react-query/Customer/commision';
import {Column} from '@/types';
import {useNavigate} from '@tanstack/react-router';
import {useFetchCustomerList} from '@/lib/react-query/Admin/Home/adminHome';
import Loader from '@/components/common/Loader';
import {useCustomerLogin} from '@/lib/react-query/Auth/auth';
import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {useAuthContext} from '@/context/AuthContext';

type CustomerData = {
  name: string;
  crnNo: string;
  phone: string;
  email: string;
  sponsorId: string;
  password: string;
};
interface DecodedToken extends JwtPayload {
  user: {
    role: string;
  };
}

const columns: Column<CustomerData>[] = [
  {header: 'Name', accessor: 'name'},
  {header: 'Customer ID', accessor: 'crnNo'},
  {header: 'Mobile No', accessor: 'phone'},
  {header: 'Email', accessor: 'email'},
  {header: 'Sponsor ID', accessor: 'sponsorId'},
  {header: 'Password', accessor: 'password'},
];

const DisplayCustomerList: React.FC = () => {
  const {mutateAsync: signIn} = useCustomerLogin();
  const navigate = useNavigate();
  const {data: apiData, isLoading, error} = useFetchCustomerList();
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  useEffect(() => {
    if (apiData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = apiData?.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
        crnNo: customer.crnNo,
        phone: customer.phone,
        email: customer.email,
        sponsorId: customer.sponsorId,
        password: customer.password,
        action: 'Edit/Delete',
      }));
      // Sort customers by creation date to show new customers at the top
      const sortedData = mappedData.sort((a, b) =>
        b.crnNo.localeCompare(a.crnNo),
      );
      setCustomerData(sortedData);
    }
  }, [apiData]);

  const {setUser, setIsAuthenticated, setToken} = useAuthContext();
  const handleLogin = async (item) => {
    await localStorage.removeItem(QUERY_KEYS.TOKEN);
    try {
      const res = await signIn({
        email: item.email,
        password: item.password,
      });
      setUser(jwtDecode(res.data.token.accessToken || ''));
      setToken(res.data?.token);
      setIsAuthenticated(true);
      const decoded: DecodedToken = jwtDecode(res.data.token.accessToken || '');
      const role = decoded.user.role;
      if (role === 'ADMIN') {
        window.location.href = '/';
      }
      if (role === 'CUSTOMER') {
        window.open(import.meta.env.VITE_REDIRECT_URL, '_blank');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    navigate({
      to: `/admin/UpdateCustomer/${item.id}`,
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching customer data.</div>;

  return (
    <div>
      <GenericTable
        title="Customer List"
        data={customerData}
        columns={columns}
        itemsPerPage={15}
        searchAble
        onEdit={handleEdit}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default DisplayCustomerList;
