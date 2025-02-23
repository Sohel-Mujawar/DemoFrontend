import React from 'react';
import '@/assets/css/loader.css';

const Loader: React.FC = () => {
  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
