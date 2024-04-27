import React, { useEffect, useState } from 'react';
import HeadingTitle from '../general/HeadingTitle';
import { FaLocationArrow } from "react-icons/fa";
import Button from '../general/Button';
import axios from 'axios';

const Information = () => {
  // Örnek veri dizisi
  const datas = [
    "Akıllı telefonlardan dizüstü bilgisayarlara kadar her türlü cihaz. Akıllı telefonlardan dizüstü bilgisayarlara ",
    "Dünyadaki herhangi bir cep telefonu numarası takip edilebilir.",
    "Akıllı telefonlardan dizüstü bilgisayarlara kadar her türlü cihaz. Akıllı telefonlardan dizüstü bilgisayarlara ",
    "Dünyadaki herhangi bir cep telefonu numarası takip edilebilir.",
    "Akıllı telefonlardan dizüstü bilgisayarlara kadar her türlü cihaz.",
    "Dünyadaki herhangi bir cep telefonu numarası takip edilebilir.",

  ];

  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/information`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className='md:flex my-1 md:my-3 md:p-5 '>
        <div className='w-2/2 md:w-1/2 mb-5 md:p-5'>
          <HeadingTitle small title="Gebeld ile numara sorgulamak artık çok kolay" />

          {/* Veri dizisini map fonksiyonu ile dönerek liste öğelerini oluşturun */}
          <ol>
            {data.slice(0, 4).map((item, index) => (
              <li key={index} className='dark:text-gray-400 text-gray-800 flex items-center py-1'>
                <FaLocationArrow size={19} className='text-textMain mr-2' />
                <span className="flex-1">{item.description}</span>
              </li>
            ))}
          </ol>
          {/* <Button btnText="Daha Fazla" /> */}
        </div>
        {
          data.slice(0, 1).map((item) => (
            <div className=' w-2/2 md:w-1/2 h-[300px] md:h-[400px] '>
            <img src={item.image} alt='Image' className='object-contain p-5 md:p-1 w-full h-full' />
          </div>
          ))
        }
      </div>
      <div className='w-full h-52 shadow-lg flex justify-center items-center '>
        Ads
      </div>

    </div>
  );
}

export default Information;
