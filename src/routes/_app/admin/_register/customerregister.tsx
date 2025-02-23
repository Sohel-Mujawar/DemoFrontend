import CustomerRegistration from '@/pages/CustomerRegistration';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_register/customerregister')({
  component: CustomerRegistration,
});
