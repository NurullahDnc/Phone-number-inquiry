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


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);

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
        },
        {
            id: "6",
            title: "Gizlilik Politikası",
            url: "/admin/privacyPolicy",
            icon: MdPolicy
        }, {
            id: "7",
            title: "Sıkça Sorulan Sorular",
            url: "/admin/faq",
            icon: FaQuestionCircle
        },{
            id: "8",
            title: "Bilgi",
            url: "/admin/information",
            icon: FaInfoCircle
        },{
            id: "9",
            title: "Logo",
            url: "/admin/logo",
            icon: GiHamburgerMenu
        }
        , {
            id: "10",
            title: "Siteye Git",
            url: "/",
            icon: FaArrowLeft
        }
    ]
    

    return (
        <nav className={` bg-gray-200 shadow-md h-[100vh] w-[270px] z-1000 ${isOpen ? "absolute  left-[-270px] " : ""} `}>

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
                                    <span class="ms-3 text-[18px] "> {item.title} </span>
                                </Link>
                            </li>
                        ))
                    }

                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <CgLogOut size={25} />
                            </svg>
                            <span class="ms-3"> Cıkıs Yap </span>
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
