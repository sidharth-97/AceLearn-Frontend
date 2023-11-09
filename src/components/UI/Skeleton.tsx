import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const MySkeleton = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
    <div className="w-full">
      <div className="max-w-sm mx-auto p-6 bg-white rounded shadow-md">
        <Skeleton height={20} style={{ marginBottom: '10px' }} />
        <Skeleton count={3} height={16} style={{ marginBottom: '6px' }} />
        <Skeleton height={20} />
      </div>
    </div>
  </div>
  );
};

export default MySkeleton;
