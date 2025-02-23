import Network from '@/pages/Network';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_Network/network')({
  component: Network,
});
