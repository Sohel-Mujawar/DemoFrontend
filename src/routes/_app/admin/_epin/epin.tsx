import AdminEpinManagement from '@/pages/AdminEpinManagement';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_epin/epin')({
  component: AdminEpinManagement,
});
