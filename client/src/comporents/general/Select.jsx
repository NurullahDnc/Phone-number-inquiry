import React from 'react'


const Select = ({ register,required, errors, id, title, placeholder, option, defaultValue }) => {
     return (

        <form class="w-1/4 ">
            <select
                id={id}
                {...register(id, { required })}
                defaultValue={defaultValue}
                className={`${errors && errors['id'] ? "border-red-800" : ""} bg-gray-50 py-3.5 px-2 border font-semibold md:px-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >

                {option.map(optionItem => (
                    <option key={optionItem._id || optionItem.id} value={optionItem.value} style={{ margin: "20px 0", color: optionItem.color }}>{optionItem.label}</option>
                ))}
            </select>
        </form>

    )
}

export default Select
