import {SignIn} from '@/pages';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/signin')({
  component: SignIn,
});
