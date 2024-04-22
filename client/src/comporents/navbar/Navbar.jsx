import React, { useEffect, useState } from 'react';
import Header from './Header';
import { MdOutlineDarkMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios('http://localhost:5000/logo');
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    // Tema durumunu localStorage'dan al veya varsayılan olarak "light" tema ayarla
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "light" ? "dark" : "light"
    );

    useEffect(() => {
        // localStorage'da tema "dark" ise  
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            //"dark" sınıfını ekle
            document.documentElement.classList.add("dark");
        } else {
            //"dark" sınıfını kaldır
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const changeTheme = () => {
        // Temayı değiştir (light ise dark, dark ise light)
        setTheme(theme === "light" ? "dark" : "light");
        if (theme === "dark") {
            // "dark" sınıfını ekle ve localStorage'da tema "dark" olarak ayarla
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark")
        } else {
            //"dark" sınıfını kaldır ve localStorage'da tema "light" olarak ayarla
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };




    return (
        <div className='relative'>
            <nav className="bg-white bg-transparent border-gray-200 dark:bg-gray-900 relative z-10">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {
                        data.map((item, i) => (
                            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                <span class="self-center text-2xl font-semibold whitespace-nowrap text-textMain dark:text-white">{item.logo} </span>
                            </a>
                        ))
                    }
                    <button onClick={toggleDropdown} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${isOpen ? '' : 'hidden'}`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 dark:text-gray-100 md:dark:bg-gray-900 dark:border-gray-700">
                            <li className='cursor-pointer'>
                                <Link to={"/blog"} >Blog</Link>
                            </li>
                            <li className='cursor-pointer' onClick={changeTheme}>
                                <MdOutlineDarkMode className='dark:text-gray-100' size={25} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Header />
            {/* <div className="mt-[400px] bg-blue-600"> 

            </div> */}


        </div>
    );
};

export default Navbar;
