import React from 'react';
import Epin from '@/components/AdminSide/E-pin/Epin';
import DisplayEpin from '@/components/AdminSide/E-pin/DisplayEpin';
import CustomerEpins from '@/components/AdminSide/E-pin/CustomerEpins';

const AdminEpinManagement: React.FC = () => {
  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-8 gap-8">
        <div className="col-span-8">
          <Epin />
        </div>
        <div className="col-span-8">
          <DisplayEpin />
        </div>
      </div>
    </div>
  );
};

export default AdminEpinManagement;
