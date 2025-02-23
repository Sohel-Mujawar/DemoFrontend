import {useAuthContext} from '@/context/AuthContext';
import {Navigate, Outlet} from '@tanstack/react-router';
import React from 'react';
const LandingLayout: React.FC = () => {
  const {isAuthenticated} = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LandingLayout;
