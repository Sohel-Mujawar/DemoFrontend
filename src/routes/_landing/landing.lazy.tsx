import LandingLayout from '@/layouts/LandingLayout';
import LandingPage from '@/pages/LandingPage';
import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_landing/landing')({
  component: LandingPage,
});
