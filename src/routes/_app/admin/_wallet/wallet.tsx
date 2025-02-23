import wallet from '@/components/AdminSide/Wallet/wallet';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_wallet/wallet')({
  component: wallet,
});
