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
import AuthManage from '../AuthManage';


const Information = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const imageRef = useRef();

  const [data, setData] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedinformation, setSelectedinformation] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/information`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

//! iptallllllllllll 
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/information/delete/${id}`)
      toast.success(res.data.message)
      // Silme işlemi başarılı olduğunda veriyi güncelle
      setData(prevData => prevData.filter(item => item._id !== id));

    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const handleUpdate = async (id) => {
    //secilen blog bul, state at
    const selectedinformation = data.find(blog => blog._id === id);
    setSelectedinformation(selectedinformation);
    setIsUpdateModalOpen(true);
  }

  const updateInformation = async (data) => {
    const { title, description, image } = data;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    // Yeni resim seçildiyse veya güncelleme yapılıyorsa
    if (imageRef.current && imageRef.current.value) {
      formData.append("image", imageRef.current.value);
    }
    else if (image[0]) {
      formData.append('image', image[0]);
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/information/update/${selectedinformation._id}`, formData);
      toast.success(response.data.message);

      // Veriyi güncelle
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/information`);
      setData(newData.data.data);

      setIsUpdateModalOpen(false);
      setSelectedinformation(null);
      setFileSelected(false); // Dosyanın tekrar seçilmediğinden emin olun
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }


  useEffect(() => {
    // Seçilen blog değiştiğinde formdaki inputların değerlerini set et, update icin
    if (selectedinformation) {
      setValue('id', selectedinformation.id);
      setValue('image', selectedinformation.image);
      setValue('description', selectedinformation.description);
      setValue('title', selectedinformation.title);


    }
  }, [selectedinformation, setValue]);

  const createInformation = async (data) => {

    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('title', data.title);
    formData.append('description', data.description);

    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/information/create`, formData);
      setIsCreateModalOpen(false);
      toast.success(response.data.message)

      //create isleimden sonra guncel veriyi al
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/information`);
      setData(newData.data.data);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
  //create elementi
  const createElement = (
    <form onSubmit={handleSubmit(createInformation)} encType="multipart/form-data">
      <Input id="title" title="Başlık Giriniz" type="text" placeholder="Başlık Giriniz" register={register} errors={errors} required />
      <Textarea id="description" title="Açıklama Giriniz" type="text" placeholder="Açıklama Giriniz" register={register} errors={errors} required />
      <Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} />
      <Button btnText={"Bilgi ekle"} />
    </form>
  )

  const updateElement = (
    <form onSubmit={handleSubmit(updateInformation)} encType="multipart/form-data">
      <Input id="title" title="Başlık Giriniz" type="text" placeholder="Başlık Giriniz" register={register} errors={errors} required />
      <Textarea id="description" title="Açıklama Giriniz" type="text" placeholder="Açıklama Giriniz" register={register} errors={errors} required />
      {<Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelected(true)} />}
      {selectedinformation && selectedinformation.image && !fileSelected && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedinformation.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}

      <Button btnText={"Bilgi Güncelle"} />
    </form>
  )


  return (
    <div>
      <AuthManage />


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                id
              </th>
              <th scope="col" class="px-6 py-3">
                image
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Text
              </th>
              <th scope="col" class="px-6 py-3">
                Güncelle
              </th>
              <th scope="col" class="px-6 py-3">
                Sil
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

                    <img class="h-auto w-24" src={item.image} alt="image description" />
                    {/* {item.image} */}
                  </td>
                  <td class="px-6 py-4">
                    {item.title}
                  </td>
                  <td class="px-6 py-4">
                    {item.description}
                  </td>
                  <td class="px-6 py-4" onClick={() => handleUpdate(item._id)}>
                    <a href="#" class="font-medium text-textMain dark:text-blue-500 hover:underline"> <RxUpdate size={25} /> </a>
                  </td>
                  <td class="px-6 py-4" onClick={() => handleDelete(item._id)}>
                    <a href="#" class="font-medium text-red-800 dark:text-blue-500 hover:underline"> <AiTwotoneDelete size={25} /> </a>
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
      <Button onClick={() => setIsCreateModalOpen(true)} btnText={"Bilgi Ekle"} />

      <Modal
        isOpen={isCreateModalOpen}
        title="Bilgi Olustur"
        bodyElement={createElement}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
        btnNull
        modals

      />

      <Modal
        isOpen={isUpdateModalOpen}
        title="Bilgi Güncelle"
        bodyElement={updateElement}
        onClose={() => { setIsUpdateModalOpen(!isUpdateModalOpen) }}
        btnNull
        modals

      />

    </div>
  )
}

export default Information
