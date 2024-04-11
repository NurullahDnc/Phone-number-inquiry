import React from 'react'

const HeadingTitle = ({title, center, small}) => {
  return (
    <div>
      <h1 className={` font-poppins text-3xl text-textMain  ${center? "text-center": ""}  ${small? "text-[21px] py-2": "py-5"}  `}>{title}</h1>
    </div>
  )
}

export default HeadingTitle
