import React from 'react'

const HeadingTitle = ({ title, center, small, xSmall, light }) => {
  return (
    <div>
      <h1 className={`  text-3xl text-gray-900 font-semibold dark:text-white ${center ? "text-center" : ""} ${light ? " text-[15px] pb-8 md:text-[17px] py-1" : ""} ${small ? " text-[19px] md:text-[24px] py-1" : ""} ${xSmall ? " text-[19px] md:text-[21px] py-2" : ""}  `}  >{title}</h1>
    </div>
  )
}



export default HeadingTitle
