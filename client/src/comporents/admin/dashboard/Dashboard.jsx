import React, { useEffect, useState } from 'react'
import { IoCall } from "react-icons/io5";
import PhoneNumberCart from './PhoneNumberCart';
import { FaComment } from "react-icons/fa";
import Number from '../number/Number';
import { MdFeedback } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import Comment from '../comment/Comment';
import Feedback from '../feedback/Feedback';
import Blog from '../blog/Blog';
import AuthManage from '../AuthManage';




const Dashboard = () => {

  const numberStatus = "true"
  const commentStatus = "true"
  const feedbackStatus = "true"
  const blogStatus = "true"

  


  const countData = [
    {
      _id: 1,
      title: "Numaralar",
      count: "150",
      icon: IoCall,
      bgColor: "yellow-500",
      url: "/admin/number"

    },
    {
      _id: 2,
      title: "Yorumlar",
      count: "150",
      icon: FaComment,
      bgColor: "green-500",
      url: "/admin/number"

    }, {
      _id: 3,
      title: "Geri Bildirim",
      count: "150",
      icon: MdFeedback,
      bgColor: "blue-500",
      url: "/admin/feedback",

    }, {
      _id: 4,
      title: "Blog",
      count: "150",
      icon: IoNewspaper,
      bgColor: "red-500",
      url: "/admin/blog"

    }
    ,
  ]

  return (
    <div className='h-screen '>
      <AuthManage />

      <div className='w-full h-auto flex flex-wrap'>
        {countData.map((item) => (
          <PhoneNumberCart
            key={item._id}
            count={item.count}
            title={item.title}
            Icon={item.icon}
            bgColor={item.bgColor}
            url={item.url}
          />
        ))}
      </div>

      <div className='w-full'>
        <Number initialData={numberStatus} title="Numaralar" />
        <Comment initialData={commentStatus} title="Yorumlar" />
        <Feedback initialData={feedbackStatus} title="Geri Bildirimler" /> 
        <Blog initialData={blogStatus} title="Blog" /> 

      </div>

    </div>
  )
}

export default Dashboard
