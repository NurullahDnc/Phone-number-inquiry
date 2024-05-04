import React, { useEffect, useState } from 'react';
import Button from '../general/Button';
import { Link, useNavigate } from 'react-router-dom';
import HeadingTitle from './HeadingTitle';
import axios from 'axios';
import { GoArrowRight } from "react-icons/go";


const Faq = ({ faqss, count, btn, seeCount }) => {
  const route = useNavigate();


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
    <div className='w-full block lg:flex  '>

      <div className='bg-[#fffffc] px-2  mb-7 md:mb-0 md:px-10 py-4 md:py-9 w-3/3 lg:w-2/3 lg:mr-4 dark:bg-gray-800 rounded-lg'>
        <div className=' pl-3 '>
          <HeadingTitle small title={"Sık Sorulan Sorular"} />

        </div>
        {data?.slice(0, count).map((faq, index) => (
          <div key={index} className='rounded-lg' data-accordion="open">
            <h2 className=' ' id={`accordion-open-heading-${index}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 md:py-5 md:px-1 font-medium text-left text-gray-600 rounded-t-xl dark:focus:ring-gray-800 dark:text-gray-400  gap-3"
                data-accordion-target={`#accordion-open-body-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`accordion-open-body-${index}`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="flex text-[16px] h-auto font-semibold dark:text-gray-400 text-[#4f4f4e] transition  delay-20 sm:text-[14px] lg:text-[15px] ">
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

                  <h1 className=' pl-2 sm:pl-1 text-gray-800 dark:text-gray-100 font-semibold lg:pl-5'>

                    {faq.title}?
                  </h1>
                </span>
              </button>
            </h2>

            <div
              id={`accordion-open-body-${index}`}
              className={`${openIndex === index ? 'block' : 'hidden'
                } lg::px-4 pl-2  sm:ml-4 lg:ml-8 border-gray-200 dark:border-gray-700  `}
              aria-labelledby={`accordion-open-heading-${index}`}
            >
              <div className=" md:py-4 lg:py-0 leading-1.5 text-[14px] md:text-[15px] indent-3 text-[#656564] dark:text-gray-300">
                {faq.description}
              </div>
           



            </div>
            
          </div>
        ))}
        <div className='pl-3 sm:pl-7 lg:pl-10 '>
        {
                btn ? (
                  <a href={"/sikca-sorulan-sorular"}>
                    <p style={{ borderBottomWidth: "2.3px" }} className=' pt-5   leading-5 text-[14px] md:text-base w-full lg:w-auto inline-block items-center gap-2 text-gray-800 font-bold border-b dark:border-gray-300 dark:text-gray-300 border-gray-800'>
                      Butun sıkça sorulan soruları ve yanıtlarını okuyun
                    </p>
                  </a>
                ) : ""
              }
        </div>
      </div>
      <div className=' w-3/3  lg:w-1/3' >
        <img src="https://www.businessworldglobal.com/wp-content/uploads/2021/02/BMW-M5_CS___n.jpg" alt='Image' className='object-cover md:mt-0 mt-2 rounded-md  w-full h-full' />

      </div>

    </div>
  );
};

export default Faq;
