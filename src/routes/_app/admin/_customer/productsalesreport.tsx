import ProductSalesReport from '@/components/AdminSide/Customer/ProductSalesReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/_customer/productsalesreport',
)({
  component: ProductSalesReport,
});
