import CustomerDashboard from '@/pages/CustomerDashboard';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/dashboard')({
  component: CustomerDashboard,
});
