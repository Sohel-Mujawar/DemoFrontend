import SyncLoader from 'react-spinners/SyncLoader';

import {RootLayout} from '@/layouts';
import {createRootRoute} from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
  loader: () => <SyncLoader />,
});
