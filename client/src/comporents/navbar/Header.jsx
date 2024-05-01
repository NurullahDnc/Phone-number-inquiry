import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const [inputData, setInputData] = useState()
    const router = useNavigate();


    const [headerImage, setHeaderImage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/header`);
                setHeaderImage(res.data.data)
            } catch (error) {
                console.log(error);

            }
        }
        fetchData()
    }, [])

    const HandleClick = (e) => {
        e.preventDefault()

        setInputData("");
        router(`/telefon-numarasi/${inputData}`)
        //page refresh

    }

    return (

        <div className=' px-2 md:px-0 '  >
            <div className="w-[100%] h-full text-center">
                {
                    headerImage.map((item, i) => (
                        <>
                            <h1 className="md:text-3xl text-2xl text-white font-bold mb-1">{item.title} </h1>
                            <p class="mb-8 text-lg font-normal text-gray-200 lg:text-lg  dark:text-gray-200">{item.description}</p>
                        </>

                    ))
                }
                <form class="max-w-md mx-auto" onSubmit={HandleClick}>
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">

                            <svg class="w-4 h-4  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>

                        <input type="tel"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            id="default-search"
                            class="block w-[95%] mx-auto md:w-full p-[7.5px]  sm:p-2.5 md:p-3 ps-8 md:ps-10 text-[17px] md:text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-gray-200 dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold "
                            placeholder="+31612345678"
                            required />
                        <button type="submit" class="text-white absolute top-1 md:top-2 text-[12px] md:text-sm mr-3 md:mr-2 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sorgula</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;
