import DisplayFlashOutCommision from '@/components/AdminSide/Customer/DisplayFlashOutCommision';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_customer/flashoutcommision')(
  {
    component: DisplayFlashOutCommision,
  },
);
