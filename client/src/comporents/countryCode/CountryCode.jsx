import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeadingTitle from '../general/HeadingTitle';
import ReactPaginate from 'react-paginate';

const CountryCode = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countryCodes, setCountryCodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://restcountries.com/v2/all");
                setCountryCodes(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const filteredCountryCodes = countryCodes.filter(countryCode =>
        countryCode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 9;
    const offset = currentPage * itemsPerPage;
    const paginatedCountryCodes = filteredCountryCodes.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredCountryCodes.length / itemsPerPage);

    return (
        <div className='w-full m-auto md:w-2/3 flex flex-col p-3'>
            <div className="pb-4  dark:bg-gray-900">
                <div className='w-full md:flex justify-between items-center'>
                    <div>
                        <HeadingTitle title="Uluslararası Telefon Kodları" small />
                    </div>
                    <div className="relative mt-1 w-full md:w-auto">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={e => setSearchTerm(e.target.value)} type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ülke Ara" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-md ">
                <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='font-bold text-[16px] '>
                            <th scope="col" className="px-6 py-3">
                                Ülke Bayragı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ülke
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Alan Kodu
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedCountryCodes.map(countryCode => (
                            <tr key={countryCode.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <th scope="col" className="px-6 py-3 w-16">
                                    <img src={countryCode.flag} alt=' ' />
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {countryCode.name}
                                </th>
                                <td className="px-6 py-4 font-bold text-sm md:text-base">
                                    <span className='font-bold text-sm md:text-base'>+</span>{countryCode.callingCodes}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate
                    className='paginate dark:text-white'
                    breakLabel="..."
                    nextLabel="  >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<  "
                    forcePage={currentPage}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default CountryCode;
