import CommisionReport from '@/components/UserSide/CommisionReport/CommisionReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customer/_report/reportc')({
  component: CommisionReport,
});
