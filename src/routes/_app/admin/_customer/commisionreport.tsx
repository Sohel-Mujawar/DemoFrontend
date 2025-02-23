import CustomerReport from '@/components/AdminSide/Customer/DisplayCommisionReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_customer/commisionreport')({
  component: CustomerReport,
});
