import React from 'react';
import SideBar from '../sidebar';

const Body: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex'>
      <SideBar />
      <div className="flex-1 p-5  overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
}

export default Body;