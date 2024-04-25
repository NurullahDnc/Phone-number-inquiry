import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiTwotoneDelete } from "react-icons/ai";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

const Number = ({ initialData, title }) => {
    const [data, setData] = useState([]);

    //number get
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/number`);
                setData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    //*-------------------- react-paginate (sayfa sınırlandırma)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const datas = Array.isArray(data) ? data.slice(itemOffset, endOffset) : [];
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    //*-------------------- react-paginate (sayfa sınırlandırma)

    //number delete
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/number/delete/${id}`);
            setData(prevData => prevData.filter(item => item._id !== id));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <p className='text-lg py-2 '>{initialData && title}</p>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ülke Kodu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ülke Adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefon Numarası
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sil
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialData && initialData.length > 0 ? (
                            datas.slice(0, 4).map((item) => (
                                <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item._id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.countryCode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.countryName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.number}
                                    </td>
                                    <td className="px-6 py-4" onClick={() => handleDelete(item._id)}>
                                        <a href="#" className="font-medium text-red-800 dark:text-blue-500 hover:underline"> <AiTwotoneDelete size={25} /> </a>
                                    </td>
                                </tr>
                            ))
                        ) : ( 
                            datas.map((item) => (
                                <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item._id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.countryCode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.countryName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.number}
                                    </td>
                                    <td className="px-6 py-4" onClick={() => handleDelete(item._id)}>
                                        <a href="#" className="font-medium text-red-800 dark:text-blue-500 hover:underline"> <AiTwotoneDelete size={25} /> </a>
                                    </td>
                                </tr>
                            ))
                        )}
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
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default Number;
