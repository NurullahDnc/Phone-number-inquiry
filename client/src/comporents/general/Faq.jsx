import React, { useEffect, useState } from 'react';
import Button from '../general/Button';
import { Link, useNavigate } from 'react-router-dom';
import HeadingTitle from './HeadingTitle';
import axios from 'axios';
import { GoArrowRight } from "react-icons/go";


const Faq = ({ faqss, count, btn, seeCount  }) => {
  const route = useNavigate();

  console.log("seeCount", seeCount);

  const [openIndex, setOpenIndex] = useState(seeCount);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/faq`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  return (
    <div className='w-full block md:flex  '>

      <div className='bg-[#fffffc] px-2 pb-5 md:px-5 w-3/3 md:w-2/3 md:mr-4 dark:bg-gray-800 rounded-lg'>
        <HeadingTitle small title={"Sık Sorulan Sorular"} />
        {data?.slice(0, count).map((faq, index) => (
          <div key={index} className='rounded-lg' data-accordion="open">
            <h2 className=' ' id={`accordion-open-heading-${index}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 md:py-5 px-1 font-medium text-left text-gray-600 rounded-t-xl dark:focus:ring-gray-800 dark:text-gray-400  gap-3"
                data-accordion-target={`#accordion-open-body-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`accordion-open-body-${index}`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="flex h-6 text-sm font-semibold dark:text-gray-400 text-[#4f4f4e] transition  delay-20 md:text-[16px] ">
                  <p
                    className={`${openIndex === index 
                      ? "w-3 md:w-4 h-2 md:h-3 mx-1"
                      : "w-5 sm:w-4 md:w-6 h-3 sm:h-3 md:h-4"
                      } mr-3 m-auto  `}
                  >
                    <svg
                      className="rounded-full "
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#D1D5DB" />
                    </svg>
                  </p>

                  <h1 className=' pl-2 text-gray-800 font-semibold md:pl-5'>

                    {faq.title}?
                  </h1>
                </span>
              </button>
            </h2>

            <div
              id={`accordion-open-body-${index}`}
              className={`${openIndex === index ? 'block' : 'hidden'
                } md:px-4 pl-2  md:ml-8 border-gray-200 dark:border-gray-700  `}
              aria-labelledby={`accordion-open-heading-${index}`}
            >
              <div className="mb-2 leading-1.5 text-[16px] md:text-[15px] indent-3 text-[#656564] dark:text-gray-500">
                {faq.description}
              </div>
              {
  btn ? (
    <Link to={"/sikca-sorulan-sorular"}>
      <p style={{ borderBottomWidth: "2px" }} className='text-base pt-2 flex  w-full lg:w-1/2 items-center gap-2 text-gray-800 font-bold border-b border-gray-800'>
        Butun sıkça sorulan soruları ve yanıtlarını okuyun <GoArrowRight size={25} />
      </p>
    </Link>
  ) : ""
}
 


            </div>
          </div>
        ))}
      </div>
      <div className=' w-3/3  md:w-1/3' >
        <img src="https://www.businessworldglobal.com/wp-content/uploads/2021/02/BMW-M5_CS___n.jpg" alt='Image' className='object-cover md:mt-0 mt-2 rounded-md  w-full h-full' />

      </div>

    </div>
  );
};

export default Faq;
