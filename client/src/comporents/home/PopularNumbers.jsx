import React, { useEffect, useState } from 'react'
import HeadingTitle from '../general/HeadingTitle'
import { Link, useNavigate } from 'react-router-dom';
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

 
  return (
    <div className='w-full justify-between lg:flex my-7 '>

      <div className='  w-full lg:w-[49%] mt-7 lg:my-0 md:px-12 py-8 flex-wrap p-3 bg-[#fffffc] dark:bg-gray-800 rounded-2xl'>
        <div className=' ml-4 md:ml-7'>

          <HeadingTitle small title="Son yapilan yorumlar" />
        </div>

        <div className='flex justify-around  md:justify-center flex-wrap gap-3 py-4'>
          {
            data?.slice(0, 18).map((item, i) => (

              item.number ? <div key={i} className='w-[45%] md:w-[30%] py-1  cursor-pointer text-left rounded-md font-semibold  '>

                
                <Link to={`/telefon-numarasi/${item.number}`} className='text-[15px] font-poppins font-semibold hover:bg-red-300 hover:text-red-800 py-2 px-4 hover:rounded-2xl dark:text-gray-300  md:text-[17px]   '>

                  {item.number?.number}
                </Link>
              </div> : null

            ))
          } 

        </div>
      </div>

      <div className='  w-full lg:w-[49%] mt-7 lg:my-0 md:px-12 py-8 flex-wrap p-3 bg-[#fffffc] dark:bg-gray-800 rounded-2xl'>
        <div className=' ml-4 md:ml-7'>

          <HeadingTitle small title="En cok yorumyapilan numaralar" />
        </div>

        <div className='flex justify-around  md:justify-center flex-wrap gap-3 py-4'>
          {
            sortedNumbers.slice(0, 18).map((item, i) => (
              <div key={i} className='w-[45%] md:w-[30%] py-1  cursor-pointer text-left rounded-md font-semibold  '>
                <Link to={`/telefon-numarasi/${item.number?.number}`} className='text-[15px] font-poppins font-semibold hover:bg-red-300 hover:text-red-800 py-2 px-4 hover:rounded-2xl dark:text-gray-300  md:text-[17px]   '>

                  {item.number?.number}
                </Link>
              </div>
            ))
          }

        </div>
      </div>






    </div>
  )
}

export default PopularNumbers
