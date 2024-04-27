import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const [inputData, setInputData] = useState()
    const router = useNavigate();

    const HandleClick =(e)=>{
        e.preventDefault()

        setInputData(""); 
        router(`/telefon-numarasi/${inputData}`)
        //page refresh
        window.location.reload(); 

    }
   
    return (
         
             <div className=' px-2 md:px-0 '  >
                    <div className="w-[100%] h-full text-center">
                    <h1 className="md:text-3xl text-2xl text-white font-bold mb-1">TELEFON NUMARASINI BUL</h1>
                    <p class="mb-8 text-lg font-normal text-gray-200 lg:text-lg  dark:text-gray-200">Sizi arayan numaranın kime ait olduğunu   diğer kullanıcılarının yorumlarına bakarak öğrenin.</p>

                    <form class="max-w-md mx-auto" onSubmit={HandleClick}>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="number" value={inputData} onChange={(e)=> setInputData(e.target.value)} id="default-search" class="block w-full p-3 ps-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-gray-200 dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold " placeholder="+90123456789" required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
             </div>
    );
};

export default Header;
