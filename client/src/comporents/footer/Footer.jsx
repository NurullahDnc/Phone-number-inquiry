import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";




const Footer = () => {

  const [data, setData] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // Mobil modu belirlemek için durum ekledik

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/logo`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();


    // Ekran genişliğine göre mobil modu belirleme
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 568); // Örneğin, 768 piksel ve altı mobil olarak kabul edilecek
    };

    handleResize(); // Sayfa yüklendiğinde ve yeniden boyutlandırıldığında çağrılır
    window.addEventListener("resize", handleResize); // Boyut değiştiğinde yeniden çağrılır

    return () => {
      window.removeEventListener("resize", handleResize); // Bileşen kaldırıldığında olay dinleyicisini kaldır
    };
  }, []);

  const toggleItem = (idx) => {
    setExpandedItem(expandedItem === idx ? null : idx);
  };

  const footerNavs = [
    {
      label: "Resources",
      items: [
        {
          href: 'javascript:void()',
          name: 'contact'
        },
        {
          href: 'javascript:void()',
          name: 'Support'
        },
        {
          href: 'javascript:void()',
          name: 'Documentation'
        },
        {
          href: 'javascript:void()',
          name: 'Pricing'
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: 'javascript:void()',
          name: 'Terms'
        },
        {
          href: 'javascript:void()',
          name: 'License'
        },
        {
          href: 'javascript:void()',
          name: 'Privacy'
        },
        {
          href: 'javascript:void()',
          name: 'About US'
        },
      ]
    },
    {
      label: "Explore",
      items: [
        {
          href: 'javascript:void()',
          name: 'Showcase'
        },
        {
          href: 'javascript:void()',
          name: 'Roadmap'
        },
        {
          href: 'javascript:void()',
          name: 'Languages'
        },
        {
          href: 'javascript:void()',
          name: 'Blog'
        },
      ]
    },
    {
      label: "Company",
      items: [
        {
          href: 'javascript:void()',
          name: 'Partners'
        },
        {
          href: 'javascript:void()',
          name: 'Team'
        },
        {
          href: 'javascript:void()',
          name: 'Careers'
        },
      ],
    }
  ];

  return (
    <footer className="  md:pt-2 mb-5 bg-textMain">
      <div className="  mx-auto ">
        <div className={` flex-col-reverse max-w-screen-xl  mx-auto flex-1 mt-16 flex space-y-6 justify-between md:flex-row  ${isMobile ? 'flex' : 'md:flex-row'} md:space-y-0`}>

          <div className=' flex-col md:mr-2 w-2/5 md:w-1/6  flex justify-start'> {/* Resimlerin saga yaslanması için 'justify-start' sınıfını ekledik */}
            <Link >
              <img src={"https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"} className='w-full h-full p-1 object-contain ' alt="" />
            </Link>
            <Link >
              <img src={"https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"} className='w-full h-full p-1 object-contain ' alt="" />
            </Link>
            <Link >
              <img src={"https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"} className='w-full h-full p-1 object-contain ' alt="" />
            </Link>
          </div>


          {footerNavs.map((item, idx) => (
            <div className='w-1/4 pl-3' key={idx}>
              <h4
                onClick={() => toggleItem(idx)}
                className="text-gray-200 flex text-2xl font-semibold sm:pb-1 cursor-pointer"
              >
                {item.label}
              </h4>
              {(expandedItem === idx || !isMobile) && ( // Mobil modda tüm öğeleri açık tut
                <ul className="space-y-4 mt-5 md:ml-0 ml-2 text-gray-300">
                  {item.items.map((el, idx) => (
                    <li key={idx}>
                      <a
                        href={el.href}
                        className="duration-150 text-[16px] hover:text-gray-400"
                      >
                        {el.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>
        <div className="mt-10 py-2 md:px-10 text-center text-white  border-t bg-blue-900 border-gray-700 items-center justify-between md:flex">
          <div className=' w-full md:w-2/12 text-left font-bold text-sm '>
            © 2024 Logo 
          </div>
          <div className=' w-full md:w-10/12  my-3 text-[14px] '>
            Privacy
            Terms of Service
            Cookies
            Responsible Disclosure
            Directory
            Publication certificate
            Indian Government Services
            Edit cookies
            Code of Conduct
          </div>
          <div className=' w-full md:w-2/12 '>
            <div className='flex gap-2 md:justify-end justify-center text-textMain '>
              <p> <FaInstagram size={30} className='bg-gray-200 p-1.5 rounded-full ' /> </p>
              <p> <FaFacebookF size={30} className='bg-gray-200 p-1.5 rounded-full ' /> </p>
              <p> <FaTwitter size={30} className='bg-gray-200 p-1.5 rounded-full ' /> </p>
              <p> <FaYoutube size={30} className='bg-gray-200 p-1.5 rounded-full ' /> </p>


            </div>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;


<div>
  <p className="text-gray-300">© 2022 Float UI Inc. All rights reserved.</p>
  <div className="flex items-center gap-x-6 text-gray-400 mt-6">
    <a href="javascript:void()">
      <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="none" viewBox="0 0 48 48">
        {/* Facebook icon */}
      </svg>
    </a>
    <a href="javascript:void()">
      <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="none" viewBox="0 0 48 48">
        {/* Twitter icon */}
      </svg>
    </a>
    <a href="javascript:void()">
      <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="currentColor" viewBox="0 0 48 48">
        {/* LinkedIn icon */}
      </svg>
    </a>
  </div>
</div>