import React, { useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSpaceDashboard } from 'react-icons/md';
import { CgLogOut } from "react-icons/cg";
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
            icon: GiHamburgerMenu
        }, {
            id: "3",
            title: "Yorumlar",
            url: "/admin/comment",
            icon: GiHamburgerMenu
        }, {
            id: "4",
            title: "Geri Bildirimler",
            url: "/admin/feedback",
            icon: GiHamburgerMenu
        }, {
            id: "5",
            title: "Blog",
            url: "/admin/blog",
            icon: GiHamburgerMenu
        },
        {
            id: "6",
            title: "Gizlilik Politikası",
            url: "/admin/privacyPolicy",
            icon: GiHamburgerMenu
        }, {
            id: "7",
            title: "Sıkça Sorulan Sorular",
            url: "/admin/faq",
            icon: GiHamburgerMenu
        }
        , {
            id: "8",
            title: "Siteye Git",
            url: "/",
            icon: GiHamburgerMenu
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

            <div class="py-4 overflow-y-auto">
                <ul class="space-y-2 font-medium">

                    {
                        data.map((item) => (
                            <li key={item.id}>
                                <Link to={item.url} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        {item.icon && <item.icon size={25} />}
                                    </svg>
                                    <span class="ms-3 text-[18px] "> {item.title} </span>
                                </Link>
                            </li>
                        ))
                    }

                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <CgLogOut size={25} />
                            </svg>
                            <span class="ms-3  "> Cıkıs </span>
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
