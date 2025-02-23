import {ExternalRegistration} from '@/components/Registration/ExternalRegistration';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_registration/register/$name/$crnno')({
  component: ExternalRegistration,
});
