import React from 'react';

const Textarea = ({ id, required, title, placeholder, rows, register, errors }) => {
    return (
        <div className='my-2'>
            <p className='dark:text-gray-200'>{title} </p>
            <textarea
                id={id}
                {...register(id, { required })}
                rows={rows}
                className={`${errors && errors[id] ? "border-red-800" : ""} block p-2.5 w-full placeholder:text-[15px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={placeholder}
            ></textarea>
        </div>
    )
}

export default Textarea;
