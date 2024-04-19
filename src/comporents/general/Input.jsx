import React from 'react'


const Input = ({ register, required, errors, id, title, placeholder, option, defaultValue, type, onChange, value }) => {
     return (

        <div class=" flex-none md:w-[50%] w-full pr-5 ">
            <p className='dark:text-gray-200'>{title} </p>
            <input
                id={id}
                {...register(id, { required })}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={onChange}
                type={type}
                value={value}
                className={`${errors && errors[id] ? "border-red-800" : ""} placeholder:text-[15px]  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >


            </input>
        </div>

    )
}

export default Input
