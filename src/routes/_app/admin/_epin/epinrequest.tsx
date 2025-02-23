import EpinApproval from '@/components/AdminSide/E-pin/EpinApproval';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_epin/epinrequest')({
  component: EpinApproval,
});
