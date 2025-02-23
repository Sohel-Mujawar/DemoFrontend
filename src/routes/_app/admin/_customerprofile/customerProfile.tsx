import UpdateCustomerProfile from '@/components/AdminSide/CustomerProfile/UpdateCustomerProfile';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_customerprofile/customerProfile',
)({
  component: UpdateCustomerProfile,
});
