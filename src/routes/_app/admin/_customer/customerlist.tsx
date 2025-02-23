import CustomerList from '@/components/AdminSide/Customer/DisplayCustomerList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_customer/customerlist')({
  component: CustomerList,
});
