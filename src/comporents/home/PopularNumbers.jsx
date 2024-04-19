import React from 'react'
import HeadingTitle from '../general/HeadingTitle'
import { useNavigate } from 'react-router-dom';

const PopularNumbers = () => {

  const router = useNavigate();


  const numbers = [
    '05427895412',
    '05427895413',
    '05427895414',
    '05427895415',
    '05427895416',
    '05427895417',
    '05427895418',
    '05427895419',
    '05427895420',
    '05427895412',
    '05427895413',
    '05427895414',
    '05427895415',
    '05427895416',
    '05427895417',
    '05427895418',
    '05427895419',
    '05427895420',
    '05427895417',
    '05427895418',
    '05427895419',
    '05427895420'
  ];

  return (
    <div className='w-full   justify-between lg:flex my-10'>

      <div className='  w-full lg:w-[48%] flex-wrap p-3 shadow-none lg:shadow-lg rounded-lg'>
        <HeadingTitle small title="En Çok Yorum Yapılan Numaralar" />

        <div className='flex justify-around md:justify-between flex-wrap gap-4 py-4'>
          {
            numbers.slice(0, 12).map((item, i) => (
              <div key={i} onClick={()=> router(`/number/${item}`) } className='border-spacing-1 py-3 cursor-pointer text-center rounded-lg font-bold bg-gray-200 w-1/3 md:w-1/4'>
                 {item}
               </div>
            ))
          }

        </div>
      </div>

      

      <div className='  w-full lg:w-[48%] flex-wrap p-3 shadow-none lg:shadow-lg rounded-lg'>
        <HeadingTitle small title="En Son Yorum Yapılan Numaralar" />

        <div className='flex justify-around md:justify-between flex-wrap gap-4 py-4'>
          {
            numbers.slice(0, 12).map((item, i) => (
              <div key={i} onClick={()=> router(`/number/${item}`) } className='border-spacing-1 py-3 cursor-pointer text-center rounded-lg font-bold bg-gray-200 w-1/3 md:w-1/4'>
                 {item}
               </div>
            ))
          }

        </div>


      </div>


    </div>
  )
}

export default PopularNumbers
