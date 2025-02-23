import DisplayPendingCommisionReport from '@/components/AdminSide/Customer/DisplayPendingCommisionReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_customer/pendingcommisionreport',
)({
  component: DisplayPendingCommisionReport,
});
