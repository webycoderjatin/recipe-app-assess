import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <div className='border border-3 border-orange-500 rounded-full h-7 w-7 border-t-transparent animate-spin'></div>
      <p className='font-medium'>Loading ...</p>
    </div>
  );
}

export default LoadingSpinner;
