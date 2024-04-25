import React, { useEffect, useState } from 'react'
import HeadingTitle from '../general/HeadingTitle'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopularNumbers = () => {

  const router = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/comment`);
        setData(res.data.data)



      } catch (error) {
        console.log(error);

      }
    }

    fetchData()
  }, [])

  // Numaraları yorum sayısına göre sıralama
  const numberOfComments = data.map(item => ({
    number: item.number,
    commentCount: item.comment?.length
  }));

  // Her numaradan yalnızca bir tane göster
  const uniqueNumbers = [];
  numberOfComments.forEach(item => {
    // Eğer uniqueNumbers içinde bu numara yoksa ekleyelim
    if (!uniqueNumbers.some(num => num.number?.number === item.number?.number)) {
      uniqueNumbers.push(item);
    }
  });

  const sortedNumbers = uniqueNumbers.sort((a, b) => b.commentCount - a.commentCount);

  console.log("sortedNumbers", sortedNumbers);

  return (
    <div className='w-full   justify-between lg:flex my-10'>

      <div className='  w-full lg:w-[48%] flex-wrap p-3 shadow-none lg:shadow-lg rounded-lg'>
        <HeadingTitle small title="Son Yorum Yapılan Numaralar" />

        <div className='flex justify-around md:justify-between flex-wrap gap-4 py-4'>
          {
            data.slice(0, 12).map((item, i) => (
              <div key={i} onClick={() => router(`/number/${item.number?.number}`)} className='bg-blue-200 border-spacing-1 py-3 cursor-pointer text-center rounded-lg font-semibold  w-1/3 md:w-1/4'>
                <p className='text-[15px] md:text-[18px]   '>

                  {item.number?.number}
                </p>              
              </div>
            ))
          }

        </div>
      </div>



      <div className='  w-full lg:w-[48%] flex-wrap p-3 shadow-none lg:shadow-lg rounded-lg'>
        <HeadingTitle small title="En Çok Yorum Yapılan Numaralar" />

        <div className='flex justify-around md:justify-between flex-wrap gap-4 py-4'>
          {
            sortedNumbers.slice(0, 12).map((item, i) => (
              <div key={i} onClick={() => router(`/number/${item.number?.number}`)} className='bg-blue-200 border-spacing-1 py-3 cursor-pointer text-center rounded-lg font-semibold w-1/3 md:w-1/4'>
                <p className='text-[15px] md:text-[18px]   '>

                  {item.number?.number}
                </p>
              </div>
            ))
          }

        </div>


      </div>


    </div>
  )
}

export default PopularNumbers
