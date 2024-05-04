import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DownloadSection = () => {

  const [download, setDownload] = useState([]);

      //dow get useffect
      useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/downloadSection`);
                setDownload(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

 

  const appİmage= "https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"
  const iosİmage= "https://www.truecaller.com/cms/f0e9ab987056bd8450279de7b6ddcf1a.avif"
  

  return (
   <div>
    {
      download.map((item, i)=>(
        <div key={i} className='w-full h-auto px-3  pt-7 mt-7 bg-gray-100 dark:bg-gray-800 md:flex '>

        <div className='md:w-[40%] w-full flex items-end lg:pr-10 justify-center  md:justify-end'>
          <img src={item.image} className=' w-2/3 md:w-full xl:w-2/3 object-contain' alt="" />
        </div>
  
        <div className='md:w-[60%] my-1 w-full md:px-8 flex flex-col justify-center'>
          <h2 className='font-bold py-1 text-lg uppercase text-textMain dark:text-gray-500'>{item.title1}</h2>
          <h1 className='text-[30px] md:text-[42px] leading-8 md:leading-10 font-bold dark:text-gray-200'>{item.title2}</h1>
          <p className='leading-6 text-[15px] md:text-lg text-gray-800 my-2 dark:text-gray-400 '>{item.description}</p>
  
          <div className='w-full md:flex'>
              <div  className='w-4/5 flex sm:w-5/7 gap-3 lg:w-3/5 xl:w-2/5 py-3 h-auto mr-2'>
                <Link to={item.appUrl}>
                  <img src={appİmage} className='w-full  h-full' alt="" />
                </Link>
                <Link to={item.iosUrl}>
                  <img src={iosİmage} className='w-full h-full' alt="" />
                </Link>
              </div>
          </div>
        </div>
      </div>
      ))
    }
   </div>
  );
};

export default DownloadSection;
