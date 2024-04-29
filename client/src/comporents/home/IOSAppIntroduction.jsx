import React from 'react';
import { Link } from 'react-router-dom';

const IOSAppIntroduction = () => {
  const data = {
    title1: "DOWNLOAD TODAY",
    title2: "Trust your communication with Truecaller.",
    description: "Trusted by over 374 million people, Truecaller is proud to be a leader in caller ID and spam blocking software as well as research around call and SMS harassment.",
    images: [
      {
        url: "/url1",
        image: "https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"
      },
      {
        url: "/url2",
        image: "https://www.truecaller.com/cms/f0e9ab987056bd8450279de7b6ddcf1a.avif"
      },
      {
        url: "/url3",
        image: "https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"
      }
    ]
  };

  return (
    <div className='w-full h-auto my-12 md:flex '>
      <div className='md:w-[40%] w-full flex items-end md:pr-10 justify-center md:justify-end'>
        <img src="https://www.truecaller.com/cms/85e363473f8c26721ecd461f79ac3630.avif" className='h-full w-2/3 object-contain' alt="" />
      </div>

      <div className='md:w-[60%] my-1 w-full md:px-8 flex flex-col justify-center'>
        <h2 className='font-bold text-lg uppercase text-textMain'>{data.title1}</h2>
        <h1 className='text-[36px] md:text-[40px] leading-10 font-bold dark:text-gray-200'>{data.title2}</h1>
        <p className='leading-6 text-[15px] md:text-lg text-gray-800 my-2 dark:text-gray-400 '>{data.description}</p>

        <div className='w-full md:flex'>
          {data.images.map((item, index) => (
            <div key={index} className='w-2/5 md:w-1/5 py-3 h-auto mr-2'>
              <Link to={item.url}>
                <img src={item.image} className='w-full h-full' alt="" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IOSAppIntroduction;
