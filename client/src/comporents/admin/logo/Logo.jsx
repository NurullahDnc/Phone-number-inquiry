import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';
import Button from '../../general/Button';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import Textarea from '../../general/Textarea';
import Input from '../../general/Input';
import { useNavigate } from 'react-router-dom'


const Logo = () => {
    const [fileSelected, setFileSelected] = useState(false);
    const imageRef = useRef();

    const [data, setData] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedLogo, setSelectedLogo] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios('http://localhost:5000/logo');
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    //*-------------------- react-paginate (sayfa sınırlandırma)

    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const datas = data.slice(itemOffset, itemOffset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };


    //*-------------------- react-paginate (sayfa sınırlandırma)

    const handleUpdate = async (id) => {
         const selectedLogos = data.find(item => item._id === id);
        setSelectedLogo(selectedLogos);
        setIsUpdateModalOpen(true);
    }

    const updateLogo = async (data) => {

        const formData = new FormData();
        formData.append('logo', data.logo);
        if (imageRef.current && imageRef.current.value) {
            formData.append("image", imageRef.current.value);
          }
          else if (data.image[0]) {
            formData.append('image', data.image[0]);
          }

          console.log("for", formData);

        try {
            const response = await axios.put(`http://localhost:5000/logo/update/${selectedLogo._id}`, formData);
            toast.success(response.data.message);
            const newData = await axios('http://localhost:5000/logo');
            setData(newData.data.data);

            setIsUpdateModalOpen(false);
            setSelectedLogo(null);

        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    useEffect(() => {
         if (selectedLogo) {
            setValue('logo', selectedLogo.logo);
            setValue('image', selectedLogo.image);

        }
    }, [selectedLogo, setValue]);


    const updateElement = (
        <form onSubmit={handleSubmit(updateLogo)} encType="multipart/form-data">
            <Input id="logo" title="Logo Giriniz" type="text" placeholder="Logo Giriniz" register={register} errors={errors} required />
            {<Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelected(true)} />}
            {selectedLogo && selectedLogo.image && !fileSelected && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedLogo.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

            <Button btnText={"Logo Güncelle"} />
        </form>
    )


    return (
        <div>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Logo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                İmage
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Güncelle
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            datas.map((item) => (
                                <tr key={item._id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item._id}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.logo}
                                    </td>
                                    <td class="px-6 py-4">
                                        <img class="h-auto w-24" src={item.image} alt="image description" />
                                    </td>

                                    <td class="px-6 py-4" onClick={() => handleUpdate(item._id)}>
                                        <a href="#" class="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                    </td>

                                </tr>
                            ))
                        }

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

            <Modal
                isOpen={isUpdateModalOpen}
                title="logo Güncelle"
                bodyElement={updateElement}
                onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
                btnNull
                modals

            />

        </div>
    )
}

export default Logo
