import React, { useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSpaceDashboard } from 'react-icons/md';
import { CgLogOut } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { MdFeedback } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { MdPolicy } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import AuthManage from '../AuthManage';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenItem, setIsOpenItem] = useState(true);

    const data = [
        {
            id: "1",
            title: "Dashboard",
            url: "/admin",
            icon: MdSpaceDashboard
        }, {
            id: "2",
            title: "Numaralar",
            url: "/admin/number",
            icon: IoCall
        }, {
            id: "3",
            title: "Yorumlar",
            url: "/admin/comment",
            icon: FaComment
        }, {
            id: "4",
            title: "Geri Bildirimler",
            url: "/admin/feedback",
            icon: MdFeedback
        }, {
            id: "5",
            title: "Blog",
            url: "/admin/blog",
            icon: IoNewspaper
        },{
            id: "6",
            title: "Gizlilik Politikası",
            url: "/admin/privacyPolicy",
            icon: MdPolicy
        }, {
            id: "7",
            title: "Sıkça Sorulan Sorular",
            url: "/admin/faq",
            icon: FaQuestionCircle
        }, {
            id: "8",
            title: "Bilgi",
            url: "/admin/information",
            icon: FaInfoCircle
        }, {
            id: "8",
            title: "Ülke",
            url: "/admin/country",
            icon: FaInfoCircle
        }

    ]

    const handleLogout = () => {

        window.location.reload(); // Sayfayı yenileyerek yeni oturumu başlatın

        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
    };

    const toggleMenuItem = () => {
        setIsOpenItem(!isOpenItem); // Menüyü açmak/kapatmak için toggleMenu fonksiyonunu kullan
    };

    return (
        <nav className={` bg-gray-200 shadow-md h-[100vh] w-[270px] z-1000 ${isOpen ? "absolute  left-[-270px] " : ""} `}>
      <AuthManage />

            <div className='relative'>
                <div className="text-center py-5 font-bold text-xl border-b-2 border-textMain text-textMain	">
                    Admin Panel
                </div>
                <div className="absolute -right-14 top-0 " onClick={() => setIsOpen(!isOpen)}>
                    <div className="p-5 cursor-pointer"><GiHamburgerMenu size={25} /> </div>
                </div>
            </div>

            <div class="py-4 ml-2 overflow-y-auto">
                <ul class="space-y-2 font-medium">

                    {
                        data.map((item) => (
                            <li key={item.id}>
                                <Link to={item.url} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        {item.icon && <item.icon size={22} />}
                                    </svg>
                                    <span class="ms-3 text-[17px] "> {item.title} </span>
                                </Link>
                            </li>
                        ))
                    }

                    <li>
                        <button type="button" onClick={toggleMenuItem} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <IoSettingsSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" />
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Ayarlar</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <ul id="dropdown-example" className={`py-1 ${isOpenItem ? "" : "hidden"}`}>
                            <Link to={"/admin/logo"}>
                                <p className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Logo-Header Dunzele</p>
                            </Link>
                           
                            <Link to={"/admin/logo"}>
                                <p className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Seo Ayarı</p>
                            </Link>
                            <Link to={"/admin/password"}>
                                <p className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Sifre Yenile</p>
                            </Link>
                            <Link onClick={handleLogout} >
                                <p className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Cıkıs Yap</p>
                            </Link>

                        </ul>
                    </li>

                    <li >
                        <Link  to={"/"} class="flex items-center   p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <FaArrowLeft size={22} />
                            </svg>
                            <span class="ms-3 text-[17px] "> Siteye Git </span>
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
