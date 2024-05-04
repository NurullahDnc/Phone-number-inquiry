import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { TiSocialLinkedin } from "react-icons/ti";
import TextClip from '../general/TextClip';


const Footer = () => {

  const [data, setData] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // Mobil modu belirlemek için durum ekledik

  const [download, setDownload] = useState([]);
  const [social, setSocial] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/social`);
        setSocial(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/blog`);
        setBlog(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  const footerNavs = [
    {
      label: "About us",
      items: [
        {
          href: '',
          name: 'Download '
        },
        {
          href: '',
          name: 'Support'
        },
        {
          href: '',
          name: 'Download '
        },
        {
          href: '',
          name: 'Pricing'
        },
      ],
    },
    {
      label: "İletişim",
      items: Object.entries(social).flatMap(([id, item]) => (
        [
          {
            href: item.facebook,
            name: "Facebook"
          },
          {
            href: item.instagram,
            name: "Instagram"
          },
          {
            href: item.twitter,
            name: "twitter"
          },
          {
            href: item.linkedin,
            name: "linkedin"
          }
        ]
      )),
    },
                                                                                                                                         
    {
      label: "Keşfet",
      items: [
        {
          href: '/sikca-sorulan-sorular',
          name: 'Ülke Kodu'
        },
        {
          href: '/ulke-alan-kodlari',
          name: 'Sık Sorulan Sorular'
        },
        {
          href: '/kisisel-verilerin-korunmasi',
          name: 'kisisel verilerin korunmasi'
        },

      ]

    },
    
    {
      label: "Blog",
      items: blog.slice(0, 6).map((item) => ({ href: `/blog-detail/${item._id}/${item.title}`, name: item.title })),

    }
  ];

  const socialUrl = {
  }

  social.forEach(item => {
    socialUrl[item._id] = item;
  });



  const appİmage = "https://www.truecaller.com/cms/63a42faf0b4e8344cb601acb312d97c1.avif"
  const iosİmage = "https://www.truecaller.com/cms/f0e9ab987056bd8450279de7b6ddcf1a.avif"


  return (
    <footer className="  md:pt-2 mb-5  bg-[#0549bf]  ">
      <div className=" md:pt-7 mx-auto ">
        <div className={` flex-col-reverse max-w-screen-xl px-1 md:px-0 py-3 md:py-12 mx-auto flex-1  flex space-y-6 justify-between md:flex-row  ${isMobile ? 'flex' : 'md:flex-row'} md:space-y-0`}>

          {
            download.map((item, i) => (
              <div key={i} className=' flex-col md:mr-2 w-2/5 sm:w-[30%] lg:w-1/6  flex justify-start'>
                <Link to={item.appUrl} className='py-1' >
                  <img src={appİmage} className='w-full h-full p-1 object-contain ' alt="" />
                </Link>
                <Link to={item.iosUrl} >
                  <img src={iosİmage} className='w-full h-full p-1 object-contain ' alt="" />
                </Link>

              </div>
            ))
          }


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
                        className="duration-150 text-[14px] md:text-[16px] w-full cursor-pointer text-white hover:text-gray-400"
                      >
                        {<TextClip text={el.name} maxLength={30} />}
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
              {Object.entries(socialUrl).map(([id, item]) => (


                <p key={id} className='flex gap-2'>
                  <a href={item.instagram} target="_blank" key={id}>

                    <FaInstagram size={27} className=' bg-gray-100 p-[4px] rounded-full cursor-pointer' />
                  </a>

                  <a href={item.facebook} target="_blank" >

                    <FaFacebookF size={27} className='bg-gray-100 p-[4px] rounded-full cursor-pointer' />
                  </a>

                  <a href={item.linkedin} target="_blank" >

                    <TiSocialLinkedin size={27} className='bg-gray-100 p-[4px] rounded-full cursor-pointer' />
                  </a>

                  <a href={item.twitter} target="_blank" >

                    <RiTwitterXLine size={27} className='bg-gray-100 p-[4px] rounded-full cursor-pointer' />
                  </a>
                </p>
              ))}


            </div>
          </div>



        </div>
      </div>
    </footer>
  );
};

export default Footer;

