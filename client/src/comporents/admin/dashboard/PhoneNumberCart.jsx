import React from 'react'
import { Link } from 'react-router-dom'
import AuthManage from '../AuthManage'

const PhoneNumberCart = ({ Icon, title, count, bgColor, url }) => {

    return (
        <div className=' w-2/4 p-2 md:w-1/4'>
      <AuthManage />

            <Link to={url} >
                <div class={` bg-${bgColor} flex  md:justify-start justify-around flex-wrap max-w-sm p-2 md:p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>

                    <p class="mb-2 w-1/5 flex-wrap h-auto flex items-center justify-center tracking-tight text-gray-900 dark:text-white"> {Icon && <Icon size={25} />}  </p>
                    <div className=' text-center '>
                        <p class="font-normal flex-1  text-[17px] md:text-xl text-gray-700 dark:text-gray-400">{title} </p>
                        <p className='font-semibold flex-1 text-xl text-gray-700 dark:text-gray-400'>{count}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PhoneNumberCart
