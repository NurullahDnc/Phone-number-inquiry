import React from 'react'

const Comment = ({number, country, status, description}) => {
  return (
    <>
         <div className={`w-full bg-gradient-to-r ${status === "dangerous" ? "from-white to-red-400" : status === "trustworthy" ? "from-white to-green-400" : status == "uncertain" ?"from-white to-gray-400": "" } rounded-lg shadow-md p-5 mb-5`}>
            <div className='flex items-center mb-4'>
                <p className='text-lg font-semibold'>{number}</p>
                <p className='ml-4 text-gray-600'>{country}</p>
                <div className="ml-auto">
                <p className={` font-bold ${status === "dangerous" ? "text-red-800" : status === "trustworthy" ? "text-green-800" : status == "uncertain" ?"text-gray-600": "" }`}>
                    {`${status == "dangerous"? "Tehlikeli": status == "trustworthy"? "Güvenli": status == "uncertain"? "Belirsiz" :"" }`}
                </p>
            </div>

            </div>

            <div>
                <p className='text-gray-700'>{description}</p>
            </div>
        </div>
    </>
      
  )
}

export default Comment
