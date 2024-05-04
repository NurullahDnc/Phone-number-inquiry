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
import TextClip from '../../general/TextClip';

const Logo = () => {
    const [fileSelectedLogo, setFileSelectedLogo] = useState(false);
    const [fileSelectedHeader, setFileSelectedHeader] = useState(false);
    const [fileSelectedDownload, setFileSelectedDownload] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const imageRef = useRef();



    const [logo, setLogo] = useState([]);
    const [header, setHeader] = useState([]);
    const [social, setSocial] = useState([]);
    const [download, setDownload] = useState([]);
    const [detail, setDetail] = useState([]);
    const [blog, setBlog] = useState([]);
    const [detailBlog, setDetailBlog] = useState([]);


    const [isUpdateModalLogo, setIsUpdateModalLogo] = useState(false);
    const [isUpdateModalHeader, setIsUpdateModalHeader] = useState(false);
    const [isUpdateModalSocial, setIsUpdateModalSocial] = useState(false);
    const [isUpdateModalDownload, setIsUpdateModalDownload] = useState(false);
    const [isUpdateModalDetail, setIsUpdateModalDetail] = useState(false);
    const [isUpdateModalBlog, setIsUpdateModalBlog] = useState(false);
    const [isUpdateModalDetailBlog, setIsUpdateModalDetailBlog] = useState(false);


    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedHeader, setSelectedHeader] = useState(null);
    const [selectedSocial, setSelectedSocial] = useState(null);
    const [selectedDownload, setSelectedDownload] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [selectedDetailBlog, setSelectedDetailBlog] = useState(null);


    //logo get useffect
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

    //header get useffect
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

    //social get useffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/social`);
                setSocial(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    //dow get useffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/downloadSection`);
                setDownload(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    //detailSeo get useffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/seo/detail`);
                setDetail(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    //detailSeo get useffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/seo/blog`);
                setBlog(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    //detailSeo get useffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/seo/detail/blog`);
                setDetailBlog(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    // Logo Update
    const handleUpdate = async (id) => {
        const selectedLogos = logo.find(item => item._id === id);
        setSelectedLogo(selectedLogos);
        setIsUpdateModalLogo(true);
    };

    // Header Update
    const handleUpdateHeader = async (id) => {
        const selectedHeaders = header.find(item => item._id === id);
        setSelectedHeader(selectedHeaders);
        setIsUpdateModalHeader(true);
    };

    // social Update
    const handleUpdateSocial = async (id) => {
        const selectedSocial = social.find(item => item._id === id);
        setSelectedSocial(selectedSocial);
        setIsUpdateModalSocial(true);
    };

    // dow Update
    const handleUpdateDownload = async (id) => {
        const selectedDownload = download.find(item => item._id === id);
        setSelectedDownload(selectedDownload);
        setIsUpdateModalDownload(true);
    };

    // detailnum seo Update
    const handleUpdateDetail = async (id) => {
        const selectedDetail = detail.find(item => item._id === id);
        setSelectedDetail(selectedDetail);
        setIsUpdateModalDetail(true);
    };

    // blogseo Update
    const handleUpdateBlog = async (id) => {
        const selectedBlog = blog.find(item => item._id === id);
        setSelectedBlog(selectedBlog);
        setIsUpdateModalBlog(true);
    };

    // blog detail Update
    const handleUpdateDetailBlog = async (id) => {
        const selectedDetailBlog = detailBlog.find(item => item._id === id);
        setSelectedDetailBlog(selectedDetailBlog);
        setIsUpdateModalDetailBlog(true);
    };

    //Logo Useeffect
    useEffect(() => {
        if (selectedLogo) {
            setValue('logo', selectedLogo.logo);
            setValue('image', selectedLogo.image);
            setValue('logodescription', selectedLogo.description);
            setValue('logokeywords', selectedLogo.keywords);



        }
    }, [selectedLogo, setValue]);

    //Header Useeffect
    useEffect(() => {
        if (selectedHeader) {
            setValue('image', selectedHeader.image);
            setValue('title', selectedHeader.title);
            setValue('description', selectedHeader.description);


        }
    }, [selectedHeader, setValue]);

    //social Useeffect
    useEffect(() => {
        if (selectedSocial) {
            setValue('facebook', selectedSocial.facebook);
            setValue('instagram', selectedSocial.instagram);
            setValue('twitter', selectedSocial.twitter);
            setValue('linkedin', selectedSocial.linkedin);


        }
    }, [selectedSocial, setValue]);

    //dow Useeffect
    useEffect(() => {
        if (selectedDownload) {
            setValue('image', selectedDownload.image);
            setValue('title1', selectedDownload.title1);
            setValue('title2', selectedDownload.title2);
            setValue('description', selectedDownload.description);
            setValue('appUrl', selectedDownload.appUrl);
            setValue('iosUrl', selectedDownload.iosUrl);


        }
    }, [selectedDownload, setValue]);


    //detail Useeffect
    useEffect(() => {
        if (selectedDetail) {
            setValue('detailDescription', selectedDetail.description);
            setValue('detailKeywords', selectedDetail.keywords);

        }
    }, [selectedDetail, setValue]);

    //blog Useeffect
    useEffect(() => {
        if (selectedBlog) {
            setValue('blogDescription', selectedBlog.description);
            setValue('blogKeywords', selectedBlog.keywords);

        }
    }, [selectedBlog, setValue]);

    //blog detail Useeffect
    useEffect(() => {
        if (selectedDetailBlog) {
            setValue('detailBlogDescription', selectedDetailBlog.description);
            setValue('detailBlogKeywords', selectedDetailBlog.keywords);

        }
    }, [selectedDetailBlog, setValue]);



    //Logo Update
    const updateLogo = async (data) => {
        const { logo, image, logodescription, logokeywords } = data;

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('keywords', logokeywords);
        formData.append('description', logodescription);


        if (imageRef.current && imageRef.current.value) {
            formData.append("image", imageRef.current.value);
        }
        else if (image[0]) {
            formData.append('image', image[0]);
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/logo/update/${selectedLogo._id}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/logo`);
            setLogo(newData.data.data);
            setValue('logo', "");
            setValue('image', "");
            setIsUpdateModalLogo(false);
            setSelectedLogo(null);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // Header Update
    const updateHeader = async (data) => {
        const { title, description, image } = data;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        if (imageRef.current && imageRef.current.value) {
            formData.append("image", imageRef.current.value);
        }
        else if (image[0]) {
            formData.append('image', image[0]);
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/header/update/${"662c529353d6a4b5522ee0ff"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/header`);
            setHeader(newData.data.data);
            setValue('image', "");


            setIsUpdateModalHeader(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // social Update
    const updateSocial = async (data) => {

        const formData = new FormData();
        formData.append('facebook', data.facebook);
        formData.append('instagram', data.instagram);
        formData.append('twitter', data.twitter);
        formData.append('linkedin', data.linkedin);

 
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/social/update/${"6632d99ade0ab035d48048c9"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/social`);
            setSocial(newData.data.data);

            setValue('facebook', "");
            setValue('linkedin', "");
            setValue('twitter', "");
            setValue('facebook', "");


            setIsUpdateModalSocial(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // dow Update
    const updateDownload = async (data) => {

        const formData = new FormData();
        formData.append('title1', data.title1);
        formData.append('title2', data.title2);
        formData.append('description', data.description);
        formData.append('appUrl', data.appUrl);
        formData.append('iosUrl', data.iosUrl);

        if (imageRef.current && imageRef.current.value) {
            formData.append("image", imageRef.current.value);
        }
        else if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/downloadSection/update/${"6632e15cbd6580edfa154e5f"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/downloadSection`);
            setDownload(newData.data.data);

            setValue('image', "");
            setValue('title1', "");
            setValue('title2', "");
            setValue('description', "");
            setValue('appUrl', "");
            setValue('iosUrl', "");




            setIsUpdateModalDownload(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // detail Update
    const updateDetail = async (data) => {

        const formData = new FormData();
        formData.append('description', data.detailDescription);
        formData.append('keywords', data.detailKeywords);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/seo/detail/update/${"6634074d221fb5f3eca455fe"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/seo/detail`);
            setDetail(newData.data.data);

            setValue('detailDescription', "");
            setValue('detailKeywords', "");

            setIsUpdateModalDetail(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // blog Update
    const updateBlog = async (data) => {

        const formData = new FormData();
        formData.append('description', data.blogDescription);
        formData.append('keywords', data.blogKeywords);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/seo/blog/update/${"6634952a856b5719dd8017fb"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/seo/blog`);
            setBlog(newData.data.data);

            setValue('blogDescription', "");
            setValue('blogKeywords', "");

            setIsUpdateModalBlog(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // detail blog Update
    const updateDetailBlog = async (data) => {

        const formData = new FormData();
        formData.append('description', data.detailBlogDescription);
        formData.append('keywords', data.detailBlogKeywords);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/seo/detail/blog/update/${"6634955d856b5719dd8017fd"}`, formData);
            toast.success(response.data.message);
            const newData = await axios(`${process.env.REACT_APP_BASE_URL}/seo/detail/blog`);
            setDetailBlog(newData.data.data);

            setValue('detailBlogDescription', "");
            setValue('detailBlogKeywords', "");

            setIsUpdateModalDetailBlog(false);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };


    {/* Logo Element*/ }
    const updateElementLogo = (
        <form onSubmit={handleSubmit(updateLogo)} encType="multipart/form-data">
            <Input id="logo" title="Logo Giriniz" type="text" placeholder="Logo Giriniz" register={register} errors={errors} required />
            <Input id="logodescription" title="meta acıklama Giriniz" type="text" placeholder="meta acıklama Giriniz" register={register} errors={errors} required />
            <Input id="logokeywords" title="meta anahtarları Giriniz" type="text" placeholder="meta anahtar Giriniz" register={register} errors={errors} required />

            {<Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelectedLogo(true)} />}
            {selectedLogo && selectedLogo.image && !fileSelectedLogo && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedLogo.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

            <Button btnText={"Logo Güncelle"} />
        </form>
    );

    {/* Header Element*/ }
    const updateElementHeader = (
        <form onSubmit={handleSubmit(updateHeader)} encType="multipart/form-data">
            <Input id="title" title="Başlık Giriniz" type="text" placeholder="Başlık Giriniz" register={register} errors={errors} required />
            <Textarea id="description" title="Açıklama Giriniz" type="text" placeholder="Açıklama Giriniz" register={register} errors={errors} required />
            {<Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelectedHeader(true)} />}
            {selectedHeader && selectedHeader.image && !fileSelectedHeader && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedHeader.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

            <Button btnText={"Logo Güncelle"} />
        </form>
    );

    {/* social Element*/ }
    const updateElementSocial = (
        <form onSubmit={handleSubmit(updateSocial)} encType="multipart/form-data">
            <Input id="facebook" title="Facebook url giriniz" type="text" placeholder="url giriniz" register={register} errors={errors} required />
            <Input id="instagram" title="instagram url giriniz" type="text" placeholder="url giriniz" register={register} errors={errors} required />
            <Input id="twitter" title="twitter url giriniz" type="text" placeholder="url giriniz" register={register} errors={errors} required />
            <Input id="linkedin" title="linkedin url giriniz" type="text" placeholder="url giriniz" register={register} errors={errors} required />

            <Button btnText={"Sosyal Medya Güncelle"} />
        </form>
    );

    {/* dow Element*/ }
    const updateElementDownload = (
        <form onSubmit={handleSubmit(updateDownload)} encType="multipart/form-data">
            <Input id="title1" title="baslık1 giriniz" type="text" placeholder="baslık1 giriniz" register={register} errors={errors} required />
            <Input id="title2" title="baslık2 giriniz" type="text" placeholder="baslık2 giriniz" register={register} errors={errors} required />
            <Input id="description" title="acıklama giriniz" type="text" placeholder="acıklama giriniz" register={register} errors={errors} required />
            <Input id="appUrl" title="android url giriniz" type="text" placeholder="ios url giriniz" register={register} errors={errors} required />
            <Input id="iosUrl" title="ios url giriniz" type="text" placeholder="ios url giriniz" register={register} errors={errors} required />

            {<Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelectedDownload(true)} />}
            {selectedDownload && selectedDownload.image && !fileSelectedDownload && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedDownload.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

            <Button btnText={"indirme bölümü Güncelle"} />
        </form>
    );

    {/* detailseo Element*/ }
    const updateElementDetail = (
        <form onSubmit={handleSubmit(updateDetail)} encType="multipart/form-data">
            <Input id="detailDescription" title="description giriniz" type="text" placeholder="description giriniz" register={register} errors={errors} required />
            <Input id="detailKeywords" title="anahtar kelimeler giriniz" type="text" placeholder="anahtar kelimeler giriniz" register={register} errors={errors} required />

            <Button btnText={"detay seo güncelle"} />
        </form>
    );

    {/* nlogseo Element*/ }
    const updateElementBlog = (
        <form onSubmit={handleSubmit(updateBlog)} encType="multipart/form-data">
            <Input id="blogDescription" title="description giriniz" type="text" placeholder="description giriniz" register={register} errors={errors} required />
            <Input id="blogKeywords" title="anahtar kelimeler giriniz" type="text" placeholder="anahtar kelimeler giriniz" register={register} errors={errors} required />

            <Button btnText={"blog seo güncelle"} />
        </form>
    );
    {/* deta,lblogseo Element*/ }
    const updateElementDetailBlog = (
        <form onSubmit={handleSubmit(updateDetailBlog)} encType="multipart/form-data">
            <Input id="detailBlogDescription" title="description giriniz" type="text" placeholder="description giriniz" register={register} errors={errors} required />
            <Input id="detailBlogKeywords" title="anahtar kelimeler giriniz" type="text" placeholder="anahtar kelimeler giriniz" register={register} errors={errors} required />

            <Button btnText={"blog detay seo güncelle"} />
        </form>
    );

    return (
        <div className='my-5'>
            <AuthManage />

            {/* Logo Tablosu */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className='text-lg py-2 '>Logo Güncelle</p>

 
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" className="px-6 py-3">
                                id
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                Logo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                meta Acıklama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                meta Anahtarlar
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
                                {/* <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item._id}
                                </td> */}
                                <td className="px-6 py-4">
                                    {item.logo}
                                </td>
                                <td className="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4 min-w-[400px] lg:w-auto ">
                                    {item.keywords}
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

            {/* Header Tablosu */}
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <p className='text-lg py-2 '>Header Güncelle</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                İmage
                            </th>
                            <th scope="col" class="px-6 py-3 ">
                                Başlık
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Açıklama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {header.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                <td className="px-6 py-4">
                                    <img className="h-auto w-24" src={item.image} alt="image description" />
                                </td>
                                <td class="px-6 py-4 min-w-[250px] lg:w-auto">
                                    {item.title}
                                </td>
                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4" onClick={() => handleUpdateHeader(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* url Tablosu */}
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <p className='text-lg py-2 '>Sosyal Medya Güncelle</p>

                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Facebook
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Instagram
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Linkedin
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Twitter
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {social.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                <td class="px-6 py-4">
                                    {item.facebook}
                                </td>
                                <td class="px-6 py-4">
                                    {item.instagram}
                                </td>
                                <td class="px-6 py-4">
                                    {item.twitter}
                                </td>
                                <td class="px-6 py-4">
                                    {item.linkedin}
                                </td>
                                <td className="px-6 py-4" onClick={() => handleUpdateSocial(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* url Tablosu */}
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
      <p className='text-lg py-2 '>indirme bölümü Güncelle</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>

                            <th scope="col" className="px-6 py-3 min-w-[250px] lg:w-auto">
                                Title1
                            </th>
                            <th scope="col" class="px-6 py-3 min-w-[250px] lg:w-auto">
                                Title2
                            </th>
                            <th scope="col" class="px-6 py-3 min-w-[500px] lg:w-auto">
                                Acıklama
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Android url
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ios url
                            </th>
                            <th scope="col" className="px-6 py-3">
                                GÜNCELLE
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {download.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <img className="h-auto w-24" src={item.image} alt="image description" />
                                </td>
                                <td class="px-6 py-4">
                                    {item.title1}
                                </td>
                                <td class="px-6 py-4">
                                    {item.title2}
                                </td>
                                <td class="px-6 py-4">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4">
                                    {item.appUrl}
                                </td>
                                <td class="px-6 py-4">
                                    {item.iosUrl}
                                </td>
                                <td className="px-6 py-4" onClick={() => handleUpdateDownload(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* detail seo Tablosu */}
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <p className='text-lg py-2 '>Numara Detay Seo Güncelle</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                meta acıklama
                            </th>
                            <th scope="col" class="px-6 py-3">
                                meta anahtar
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.keywords}
                                </td>

                                <td className="px-6 py-4" onClick={() => handleUpdateDetail(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* detail seo Tablosu */}
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <p className='text-lg py-2 '>Blog Seo Güncelle</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                meta acıklama
                            </th>
                            <th scope="col" class="px-6 py-3">
                                meta anahtar
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blog.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.keywords}
                                </td>

                                <td className="px-6 py-4" onClick={() => handleUpdateBlog(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* detail seo Tablosu */}
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
            <p className='text-lg py-2 '>Blog Detay Seo Güncelle</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                meta acıklama
                            </th>
                            <th scope="col" class="px-6 py-3">
                                meta anahtar
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Güncelle
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailBlog.map((item) => (
                            <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4 min-w-[400px] lg:w-auto">
                                    {item.keywords}
                                </td>

                                <td className="px-6 py-4" onClick={() => handleUpdateDetailBlog(item._id)}>
                                    <a href="#" className="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Logo Modal*/}
            <Modal
                isOpen={isUpdateModalLogo}
                title="logo Güncelle"
                bodyElement={updateElementLogo}
                onClose={() => setIsUpdateModalLogo(!isUpdateModalLogo)}
                btnNull
                modals
            />

            {/* Header Modal*/}
            <Modal
                isOpen={isUpdateModalHeader}
                title="header Güncelle"
                bodyElement={updateElementHeader}
                onClose={() => setIsUpdateModalHeader(!isUpdateModalHeader)}
                btnNull
                modals
            />

            {/* social Modal*/}
            <Modal
                isOpen={isUpdateModalSocial}
                title="Social Güncelle"
                bodyElement={updateElementSocial}
                onClose={() => setIsUpdateModalSocial(!isUpdateModalSocial)}
                btnNull
                modals
            />


            {/* dow Modal*/}
            <Modal
                isOpen={isUpdateModalDownload}
                title="indirme bölümü Güncelle"
                bodyElement={updateElementDownload}
                onClose={() => setIsUpdateModalDownload(!isUpdateModalDownload)}
                btnNull
                modals
            />

            {/* dow Modal*/}
            <Modal
                isOpen={isUpdateModalDetail}
                title="Numara Detay Güncelle"
                bodyElement={updateElementDetail}
                onClose={() => setIsUpdateModalDetail(!isUpdateModalDetail)}
                btnNull
                modals
            />

            {/* dow Modal*/}
            <Modal
                isOpen={isUpdateModalBlog}
                title="Blog Güncelle"
                bodyElement={updateElementBlog}
                onClose={() => setIsUpdateModalBlog(!isUpdateModalBlog)}
                btnNull
                modals
            />

            {/* dow Modal*/}
            <Modal
                isOpen={isUpdateModalDetailBlog}
                title="Blog Detail Güncelle"
                bodyElement={updateElementDetailBlog}
                onClose={() => setIsUpdateModalDetailBlog(!isUpdateModalDetailBlog)}
                btnNull
                modals
            />

        </div>
    );
};

export default Logo;
