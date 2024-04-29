import React, { useEffect, useState } from 'react'
import HeadingTitle from '../general/HeadingTitle'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopularNumbers = () => {

  const router = useNavigate();

  const [data, setData] = useState([]);
  const [hover, setHover] = useState([]);


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
   
  const handleClick=(item)=>{
    router(`/telefon-numarasi/${item}`)
    
  }

  return (
    <div className='w-full justify-between lg:flex my-10'>

      <div className='  w-full lg:w-[48%] flex-wrap p-3 shadow-none lg:shadow-lg dark:bg-gray-800 rounded-lg'>
        <HeadingTitle small title="Son Yorum Yapılan Numaralar" />

        <div className='flex justify-around md:justify-between flex-wrap gap-4 py-4'>
        {
            data.slice(0, 12).map((item, i) => (
              <div key={i} onClick={()=> handleClick(item.number?.number)} className='w-[45%] md:w-[30%] border-[#D9D9D9] border-2 border-spacing-1 py-3 cursor-pointer text-center rounded-md font-semibold  '>
                <p className='text-[15px] md:text-[18px]   '>

                  {item.number?.number}
                </p>              
              </div>
            ))
          }

        </div>
      </div>



      <div className='  w-full lg:w-[48%] flex-wrap p-3 shadow-none lg:shadow-lg rounded-lg dark:bg-gray-800 '>
        <HeadingTitle small title="En Çok Yorum Yapılan Numaralar" />

        <div className='flex justify-around md:justify-between flex-wrap gap-4 py-4 '>
        {
            sortedNumbers.slice(0, 12).map((item, i) => (
              <div key={i} onClick={ ()=> handleClick(item.number?.number)} className='w-[45%] md:w-[30%] border-[#D9D9D9] border-2 border-spacing-1 py-3 cursor-pointer text-center rounded-md font-semibold  '>
                <p className='text-[15px]  md:text-[18px]   '>

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
