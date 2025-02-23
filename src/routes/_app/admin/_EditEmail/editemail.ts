import EmailChange from '@/components/ChangeEmail/EmailChange';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/_EditEmail/editemail')({
  component: EmailChange,
});
