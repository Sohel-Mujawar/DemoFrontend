import CustomerNetwork from '@/pages/CustomerNetwork';
import Network from '@/pages/Network';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_Network/networkc')({
  component: CustomerNetwork,
});
