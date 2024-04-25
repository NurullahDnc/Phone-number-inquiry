import React from 'react'

const HeadingTitle = ({ title, center, small, xSmall }) => {
  return (
    <div>
      <h1 className={` font-poppins text-3xl text-textMain font-semibold dark:text-white ${center ? "text-center" : ""}  ${small ? " text-[19px] md:text-[24px] py-2" : ""} ${xSmall ? " text-[19px] md:text-[19px] py-2" : ""}  `}  >{title}</h1>
    </div>
  )
}



export default HeadingTitle
