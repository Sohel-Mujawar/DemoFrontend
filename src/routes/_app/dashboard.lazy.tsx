import {Calendar} from '@/components/common';
import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_app/dashboard')({
  component: Calendar,
});
