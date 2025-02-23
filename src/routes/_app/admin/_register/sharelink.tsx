import {ShareRegistrationLink} from '@/components/Registration/ShareRegistrationLink';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_register/sharelink')({
  component: ShareRegistrationLink,
});
