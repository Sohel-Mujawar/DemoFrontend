import RepurchaseRequest from '@/components/AdminSide/RepurchaseProduct/RepurchaseRequest';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_repurchaseProductadmin/repurchaseproduct',
)({
  component: RepurchaseRequest,
});
