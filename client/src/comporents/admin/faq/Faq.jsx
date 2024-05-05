import axios from 'axios';
import React, { useEffect, useState } from 'react'
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


const Faq = () => {

  const [data, setData] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/faq`);
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/faq/delete/${id}`)
      toast.success(res.data.message)
      // Silme işlemi başarılı olduğunda veriyi güncelle
      setData(prevData => prevData.filter(item => item._id !== id));

    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const handleUpdate = async (id) => {
    const selectedFaqs = data.find(blog => blog._id === id);
    setSelectedFaq(selectedFaqs);
    setIsUpdateModalOpen(true);
  }

  const updateFaq = async (data) => {

    const updatedata = {
      title: data.title,
      description: data.description,

    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/faq/update/${selectedFaq._id}`, updatedata);
      toast.success(response.data.message);
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/faq`);
      setData(newData.data.data);

      setIsUpdateModalOpen(false);
      setSelectedFaq(null);

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    if (selectedFaq) {
      setValue('id', selectedFaq.id);
      setValue('image', selectedFaq.image);
      setValue('description', selectedFaq.description);
      setValue('title', selectedFaq.title);


    }
  }, [selectedFaq, setValue]);

  const createfaq = async (data) => {

    const createdata = {
      title: data.title,
      description: data.description,

    };

    try {
      setIsCreateModalOpen(false);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/faq/create`, createdata);
      toast.success(response.data.message)
      setValue('image', "");
      setValue('description', "");
      setValue('title', "");


      //create isleimden sonra guncel veriyi al
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/faq`);
      setData(newData.data.data);

    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  //create elementi
  const createElement = (
    <form onSubmit={handleSubmit(createfaq)} encType="multipart/form-data">
      <Input id="title" title="Başlık Giriniz" type="text" placeholder="Başlık Giriniz" register={register} errors={errors} required />
      <Textarea id="description" title="Açıklama Giriniz" type="text" placeholder="Açıklama Giriniz" register={register} errors={errors} required />
      <Button btnText={"Soru ekle"} />
    </form>
  )

  const updateElement = (
    <form onSubmit={handleSubmit(updateFaq)} encType="multipart/form-data">
      <Input id="title" title="Başlık Giriniz" type="text" placeholder="Başlık Giriniz" register={register} errors={errors} required />
      <Textarea id="description" title="Açıklama Giriniz" type="text" placeholder="Açıklama Giriniz" register={register} errors={errors} required />
      <Button btnText={"Soru Güncelle"} />
    </form>
  )


  return (
    <div>
      <AuthManage />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className='text-lg py-2 '>sıkça sorulan sorular</p>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                id
              </th>
              <th scope="col" class="px-6 py-3">
                Başlık
              </th>
              <th scope="col" class="px-6 py-3">
                Açıklama
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
                  <td class="px-6 py-4 min-w-[250px] lg:w-auto">
                    {item.title}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 min-w-[500px] lg:w-auto">
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
      <Button onClick={() => setIsCreateModalOpen(true)} btnText={"Soru Ekle"} />

      <Modal
        isOpen={isCreateModalOpen}
        title="Soru Olustur"
        bodyElement={createElement}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
        btnNull
        modals

      />

      <Modal
        isOpen={isUpdateModalOpen}
        title="Soru Güncelle"
        bodyElement={updateElement}
        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        btnNull
        modals

      />

    </div>
  )
}

export default Faq
