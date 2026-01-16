import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#E4B951] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-600">Loading menu...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;