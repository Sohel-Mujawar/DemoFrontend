import UpdateCustomerProfileU from '@/components/UserSide/CustomerProfileU/UpdateCustomerProfileU';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/customer/_customerprofile/customerprofilec',
)({
  component: UpdateCustomerProfileU,
});
