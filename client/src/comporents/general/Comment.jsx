import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Maps from '../detail/Maps';


const Comment = ({ id, number,numberId, country, status, description, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useNavigate();

  return (
    <div className={` ${isHovered ? 'hovered' : ''}`}>
      <div
        className={`w-full bg-gradient-to-r my-6 ${status === "dangerous" ? "from-white to-red-400" : status === "trustworthy" ? "from-white to-green-400" : status == "uncertain" ? "from-white to-gray-400" : ""} rounded-lg shadow-md p-5 mb-5`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='flex items-center mb-4'>
          <p className='text-lg font-semibold cursor-pointer' onClick={()=> router(`/number/${number}`) }>{number}</p>
          <p className='ml-4 text-gray-600'>{country}</p>
          <div className="ml-auto flex">
            <p className={` font-bold ${status === "dangerous" ? "text-red-800" : status === "trustworthy" ? "text-green-800" : status == "uncertain" ? "text-gray-600" : ""}`}>
              {`${status == "dangerous" ? "Tehlikeli" : status == "trustworthy" ? "Güvenli" : status == "uncertain" ? "Belirsiz" : ""}`}
            </p>
            <span onClick={() => router(`/deleteForm/${id}`) } className={`px-2 cursor-pointer text-red-900 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
              <FaTimes size={22} />
            </span>

          </div>
          <Maps />
        </div>
        <div>
          <p className='text-gray-700'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment;
