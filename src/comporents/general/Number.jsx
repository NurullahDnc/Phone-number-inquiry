// Number.jsx
import React from 'react';

const Number = ({ number }) => {
  return (
    <div className='flex justify-between flex-wrap gap-4 p-5'>
    
         <div className='border-spacing-1 py-2 text-center rounded-lg font-bold bg-yellow-300 w-1/4'>
          {number}
        </div>
      
    

  </div>
  );
}

export default Number;
