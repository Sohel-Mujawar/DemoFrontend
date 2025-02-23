import {Outlet} from '@tanstack/react-router';
import React from 'react';

const RootLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
