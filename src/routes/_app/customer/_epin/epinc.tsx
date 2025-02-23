import EpinUser from '@/components/UserSide/E-pinUser/EpinUser';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_epin/epinc')({
  component: EpinUser,
});
