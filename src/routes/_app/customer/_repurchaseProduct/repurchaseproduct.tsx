import repurchaseProduct from '@/components/UserSide/RepurchesProduct/repurchaseProduct';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/customer/_repurchaseProduct/repurchaseproduct',
)({
  component: repurchaseProduct,
});
