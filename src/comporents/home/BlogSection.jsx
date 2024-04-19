import React from 'react';
import HeadingTitle from '../general/HeadingTitle';
import { FaLocationArrow } from "react-icons/fa";
import Button from '../general/Button';

const BlogSection = () => {
  // Örnek veri dizisi
  const data = [
    "Akıllı telefonlardan dizüstü bilgisayarlara kadar her türlü cihaz. Akıllı telefonlardan dizüstü bilgisayarlara ",
    "Dünyadaki herhangi bir cep telefonu numarası takip edilebilir.",
    "Akıllı telefonlardan dizüstü bilgisayarlara kadar her türlü cihaz. Akıllı telefonlardan dizüstü bilgisayarlara ",
    "Dünyadaki herhangi bir cep telefonu numarası takip edilebilir.",
    "Akıllı telefonlardan dizüstü bilgisayarlara kadar her türlü cihaz.",
    "Dünyadaki herhangi bir cep telefonu numarası takip edilebilir.",

  ];

  return (
   <div>
     <div className='md:flex my-1 md:my-3 md:p-5 '>
      <div className='w-2/2 md:w-1/2 mb-5 md:p-5'>
        <HeadingTitle title="Gebeld ile numara sorgulamak artık çok kolay" />

        {/* Veri dizisini map fonksiyonu ile dönerek liste öğelerini oluşturun */}
        <ol>
          {data.slice(0, 3).map((item, index) => (
            <li key={index} className='text-[18px] dark:text-gray-400 text-gray-800 flex py-1'>
              <FaLocationArrow size={20} className='text-textMain mx-1 mt-1' />
              {item}
            </li>
          ))}
        </ol>
        <Button btnText="Daha Fazla" />
      </div>  
      <div className=' w-2/2 md:w-1/2 h-[400px]'>
        <img src='https://www.geofind-tr.com/assets/img/himg/webp/Mockup%20imagen%201_4.webp' alt='Image' className='object-contain w-full h-full' />
      </div>
    </div>
          <div className='w-full h-52 shadow-lg flex justify-center items-center '>
            Ads
          </div>
    
   </div>
  );
}

export default BlogSection;
