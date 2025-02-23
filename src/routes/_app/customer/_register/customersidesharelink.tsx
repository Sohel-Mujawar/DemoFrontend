import {ShareRegistrationLink} from '@/components/Registration/ShareRegistrationLink';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/customer/_register/customersidesharelink',
)({
  component: ShareRegistrationLink,
});
