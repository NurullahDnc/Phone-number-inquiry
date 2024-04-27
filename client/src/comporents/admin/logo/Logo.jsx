import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Button from '../../general/Button';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import Textarea from '../../general/Textarea';
import Input from '../../general/Input';
import { useNavigate } from 'react-router-dom';
import AuthManage from '../AuthManage';
import HeadingTitle from '../../general/HeadingTitle';

const Logo = () => {
    const [fileSelected, setFileSelected] = useState(false);
    const imageRef = useRef();

    const [logo, setLogo] = useState([]);
    const [header, setHeader] = useState([]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isUpdateModalLogo, setIsUpdateModalLogo] = useState(false);
    const [isUpdateModalHeader, setIsUpdateModalHeader] = useState(false);

    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedHeader, setSelectedHeader] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/logo`);
                setLogo(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/header`);
                setHeader(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);



    const handleUpdate = async (id) => {
        const selectedLogos = logo.find(item => item._id === id);
        setSelectedLogo(selectedLogos);
        setIsUpdateModalLogo(true);
    };

    const handleUpdateHeader = async (id) => {
        const selectedHeaders = header.find(item => item._id === id);
        setSelectedHeader(selectedHeaders);
        setIsUpdateModalHeader(true);
    };

    useEffect(() => {
        if (selectedLogo) {
            setValue('logo', selectedLogo.logo);
            setValue('image', selectedLogo.image);

        }
    }, [selectedLogo, setValue]);

    const updateLogo = async (data) => {
        const formData = new FormData();
        formData.append('logo', data.logo);
        if (imageRef.current && imageRef.current.value) {
            formData.append("image", imageRef.current.value);
        }
        else if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/logo/update/${selectedLogo._id}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/logo`);
            setLogo(newData.data.data);

            setIsUpdateModalLogo(false);
            setSelectedLogo(null);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const updateLogoHeader = async (data) => {
        const formData = new FormData();

        if (imageRef.current && imageRef.current.value) {
            formData.append("image", imageRef.current.value);
        } else if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/header/update/${"662c529353d6a4b5522ee0ff"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/header`);
            setHeader(newData.data.data);

            setIsUpdateModalHeader(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const updateElement = (
        <form onSubmit={handleSubmit(updateLogo)} encType="multipart/form-data">
            <Input id="logo" title="Logo Giriniz" type="text" placeholder="Logo Giriniz" register={register} errors={errors} required />
            {
                <Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelected(true)} />}
            {selectedLogo && selectedLogo.image && !fileSelected && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedLogo.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

            <Button btnText={"Logo Güncelle"} />
        </form>
    );

    const updateElementHeader = (
        <form onSubmit={handleSubmit(updateLogoHeader)} encType="multipart/form-data">
            {
                <Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelected(true)} />}
            {selectedLogo && selectedLogo.image && !fileSelected && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedLogo.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

            <Button btnText={"Logo Güncelle"} />
        </form>
    );

    return (
        <div>
            <AuthManage />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <HeadingTitle title={"Logo Güncelle"} xSmall />

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Logo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                İmage
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logo.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item._id}
                                </td>
                                <td className="px-6 py-4">
                                    {item.logo}
                                </td>
                                <td className="px-6 py-4">
                                    <img className="h-auto w-24" src={item.image} alt="image description" />
                                </td>
                                <td className="px-6 py-4" onClick={() => handleUpdate(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
                <HeadingTitle title={"Header Güncelle"} xSmall />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>

                            <th scope="col" className="px-6 py-3">
                                İmage
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {header.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item._id}
                                </td>

                                <td className="px-6 py-4">
                                    <img className="h-auto w-24" src={item.image} alt="image description" />
                                </td>
                                <td className="px-6 py-4" onClick={() => handleUpdateHeader(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <Modal
                isOpen={isUpdateModalLogo}
                title="logo Güncelle"
                bodyElement={updateElement}
                onClose={() => setIsUpdateModalLogo(!isUpdateModalLogo)}
                btnNull
                modals
            />

            <Modal
                isOpen={isUpdateModalHeader}
                title="header Güncelle"
                bodyElement={updateElementHeader}
                onClose={() => setIsUpdateModalHeader(!isUpdateModalHeader)}
                btnNull
                modals
            />

        </div>
    );
};

export default Logo;
