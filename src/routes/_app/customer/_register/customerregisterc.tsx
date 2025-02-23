import CustomerRegistration from '@/pages/CustomerRegistration';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/customer/_register/customerregisterc',
)({
  component: CustomerRegistration,
});
