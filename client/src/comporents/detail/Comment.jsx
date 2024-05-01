import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HeadingTitle from '../general/HeadingTitle';
import { FaTimes } from 'react-icons/fa';

const Comment = ({ comment, status, id }) => {

    const [isHovered, setIsHovered] = useState(false);
    const router = useNavigate();

    //hover func.
    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div>
            <div className=" py-1 ">



                <div className="w-full border-b-2  md:my-4 py-14 md:py-0 pb-12 relative md:flex "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <div className=" px-6 pt-4 md:pl-40 text-[15px] md:pb-5 font-[400]  md:text-[17px font-sans text-[#000000] dark:text-gray-400 ">
                        {comment}
                    </div>
                    <div className={`inline-block absolute w-[130px] text-[16px] my-auto font-semibold py-2 rounded-r-full text-center border-2 top-3 md:left-0    ${status === "dangerous" ? " bg-[#ffd1c5] text-[#e62c07] " : status === "trustworthy" ? "bg-[#ccece6] text-[#0eaf61] " : status === "uncertain" ? " bg-[#cacac8] text-[#545453] " : ""}`}>
                        {status === "dangerous" ? "Tehlikeli" : status === "trustworthy" ? "Güvenli" : status === "uncertain" ? "Belirsiz" : ""}
                    </div>

                    <a href={`/form-sil/${id}`} className={`px-2 bottom-0 right-3 absolute cursor-pointer text-red-900 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
                        <FaTimes size={20} />
                    </a>

                </div>


            </div>
        </div>
    )
}

export default Comment
