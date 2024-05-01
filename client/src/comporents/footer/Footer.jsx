import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { TiSocialLinkedin } from "react-icons/ti";


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
          href: '/ulke-alan-kodlari',
          name: 'Download Truecaller'
        },
        {
          href: '/sikca-sorulan-sorular',
          name: 'Support'
        },
        {
          href: '/kisisel-verilerin-korunmasi',
          name: 'Download Truecaller'
        },
        {
          href: '',
          name: 'Pricing'
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: '',
          name: 'Download Truecaller'
        },
        {
          href: '',
          name: 'Download Truecaller'
        },
        {
          href: '',
          name: 'Privacy'
        },
        {
          href: '',
          name: 'Download Truecaller US'
        },
        {
          href: '',
          name: 'About US'
        },
        {
          href: '',
          name: 'About US'
        },  {
          href: '',
          name: 'About US'
        },
      ]
    },
    {
      label: "Explore",
      items: [
        {
          href: '',
          name: 'Download Truecaller'
        },
        {
          href: '',
          name: 'Road Download Truecaller map'
        },
        {
          href: '',
          name: 'Languages'
        },
        {
          href: '',
          name: 'Download Truecaller '
        },
        {
          href: '',
          name: 'About US'
        },
      ]
    },
    {
      label: "Company",
      items: [
        {
          href: '',
          name: 'Partners'
        },
        {
          href: '',
          name: 'Download Truecaller'
        },
        {
          href: '',
          name: 'Careers'
        },
        {
          href: '',
          name: 'About Download Truecaller US'
        },
        {
          href: '',
          name: 'About US'
        },
        {
          href: '',
          name: 'Download Truecaller US'
        },
        {
          href: '',
          name: 'About US'
        },
      ],
    }
  ];

  const social = [
    {
      _id: "234",
      url: "",
    }, {
      _id: "234",
      url: "",
    }, {
      _id: "234",
      url: "",
    }, {
      _id: "234",
      url: "",
    }
  ]

  const socialIcons = {
    FaInstagram,
    FaFacebookF,
    RiTwitterXLine,
    TiSocialLinkedin,
  };


  return (
    <footer className="  md:pt-2 mb-5  bg-[#0549bf]  ">
      <div className=" md:pt-7 mx-auto ">
        <div className={` flex-col-reverse max-w-screen-xl px-1 md:px-0 py-3 md:py-12 mx-auto flex-1  flex space-y-6 justify-between md:flex-row  ${isMobile ? 'flex' : 'md:flex-row'} md:space-y-0`}>

          <div className=' flex-col md:mr-2 w-2/5 sm:w-[30%] lg:w-1/6  flex justify-start'>
            <Link className='py-1' >
              <img src={"https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"} className='w-full h-full p-1 object-contain ' alt="" />
            </Link>
            <Link >
              <img src={"https://www.truecaller.com/cms/f0e9ab987056bd8450279de7b6ddcf1a.avif"} className='w-full h-full p-1 object-contain ' alt="" />
            </Link>
           
          </div>


          {footerNavs.map((item, idx) => (
            <div className=' w-full md:w-1/4 pl-2' key={idx}>
              <h4
                onClick={() => toggleItem(idx)}
                className="text-gray-50 flex text-lg md:text-3xl sm:pb-3 cursor-pointer"
              >
                {item.label}
              </h4>
              {(expandedItem === idx || !isMobile) && ( // Mobil modda tüm öğeleri açık tut
                <ul className="space-y-5 mt-5 w-full md:ml-0 ml-2 ">
                  {item.items.map((el, idx) => (
                    <li key={idx}>
                      <a
                        href={el.href}
                        className="duration-150 text-[14px] md:text-[16px] w-full text-white hover:text-gray-400"
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
        <div className=" mt-2 md:mt-10 py-4 sm:px-8 lg:px-20 text-center text-white bg-[#003bad] items-center justify-between md:flex">
          <div className=' w-full md:w-2/12 text-center md:text-left font-bold text-[13px] '>
            © 2024 Logo
          </div>
          <div className=' w-full md:w-10/12 px-2 tracking-wide text-center md:text-left my-4 md:my-1 text-[12px] '>
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
              {Object.entries(socialIcons).map(([key, Icon], i) => (
                <a href={social[i].url} key={i}>
                  <Icon size={27} className='bg-gray-100 p-[4px] rounded-full cursor-pointer' />
                </a>
              ))}
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