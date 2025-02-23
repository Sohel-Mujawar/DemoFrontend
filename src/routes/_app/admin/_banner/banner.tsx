import Banner from '@/components/AdminSide/Banner/Banner';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_banner/banner')({
  component: Banner,
});
