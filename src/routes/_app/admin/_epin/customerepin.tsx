import CustomerEpins from '@/components/AdminSide/E-pin/CustomerEpins';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_epin/customerepin')({
  component: CustomerEpins,
});
