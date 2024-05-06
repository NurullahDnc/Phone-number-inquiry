import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Maps from '../detail/Maps';
import TextClip from '../general/TextClip';

const Comment = ({ id, number, numberId, del, country, status, description, onClick, minLength, maxLength }) => {
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
    <Link to={`/telefon-numarasi/${number}`}  className='cursor-pointer' title={`Yorumlanan telefon numarası ${number}`}>
      <div 
        className={`comment flex w-full mb-5 mt-1 relative shadow-xl dark:bg-gray-400  rounded-lg h-auto `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`w-[16px] h-full absolute left-0 top-0 rounded-lg ${status === "dangerous" ? " bg-[#ff0100]" : status === "trustworthy" ? "bg-[#316f34]" : status === "uncertain" ? " bg-[#7b7b7b]" : ""}`}></div>
        <div className='flex-1 m-auto ml-7 '>
          <h1 className='font-bold text-textMain pt-1 font-poppins '>{number}</h1>
          <p className='text-[13px] md:text-[14px] font-sans py-1 font-[400] text-[#000000] '>{minLength?.length > 0 ? <TextClip minLength={minLength} maxLength={maxLength} text={description} /> : description}</p>
        </div>
        <div className={`w-1/4 md:flex hidden justify-center items-center h-full m-auto`}>
          <button className={`commentBtn w-3/4 py-2 text-[16px] font-semibold rounded-[20px] transition  delay-20 ${  status === "dangerous" ? isHovered? "bg-[#ff0100] text-white ": "bg-[#ffb6b6]"  : status === "trustworthy" ?  isHovered? "bg-[#316f34] text-white ": "bg-[#bcf5be]"  : status === "uncertain" ? isHovered? "bg-[#7b7b7b] text-white ": "bg-[#d8d8d8]"  :""} `}>
            {status === "dangerous" ? "Tehlikeli" : status === "trustworthy" ? "Güvenli" : status === "uncertain" ? "Belirsiz" : ""}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Comment;



/*
  <div  className={` cursor-pointer ${isHovered ? 'hovered' : ''}`}>
      <div
        className={`w-full bg-gradient-to-r my-6 ${status === "dangerous" ? "from-white to-red-400" : status === "trustworthy" ? "from-white to-green-400" : status == "uncertain" ? "from-white to-gray-400" : ""} rounded-lg shadow-md p-3 md:p-5 mb-5`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='flex items-center mb-4'>
          <p onClick={()=> router(`/telefon-numarasi/${number}`) } className=' text-[16px]  md:text-lg font-semibold cursor-pointer' >{number}</p>
          <p className='ml-4 text-gray-600'>{country}</p>
          <div className="ml-auto flex justify-center">
            <p className={` font-bold ${status === "dangerous" ? "text-red-800" : status === "trustworthy" ? "text-green-800" : status == "uncertain" ? "text-gray-600" : ""}`}>
              {`${status == "dangerous" ? "Tehlikeli" : status == "trustworthy" ? "Güvenli" : status == "uncertain" ? "Belirsiz" : ""}`}
            </p>   
            <span onClick={() => router(`/form-sil/${id}`) } className={`px-2 cursor-pointer text-red-900 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
              <FaTimes size={22} />
            </span> 

          </div>
          <Maps />
        </div>
        <div>
          <p className='text-gray-700 indent-3 '>{description}</p>
        </div>
      </div>
    </div>
*/