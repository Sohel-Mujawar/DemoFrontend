import {Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </div>
  );
};

export default RootLayout;
