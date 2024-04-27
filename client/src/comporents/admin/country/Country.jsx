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


const Country = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const imageRef = useRef();

  const [data, setData] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/country`);
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
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/country/delete/${id}`)
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
    setSelectedCountry(selectedinformation);
    setIsUpdateModalOpen(true);
  }

  const updateInformation = async (data) => {
    const { country, code, image } = data;
  
    const formData = new FormData();
    formData.append('country', country);
    formData.append('code', code);
  
    // Yeni resim seçildiyse veya güncelleme yapılıyorsa
    if (image[0] || fileSelected) {
      formData.append('image', image[0]);
    }
  
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/country/update/${selectedCountry._id}`, formData);
      toast.success(response.data.message);
  
      // Veriyi güncelle
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/country`);
      setData(newData.data.data);

      setValue('country', "");
      setValue('code', "");

  
      setIsUpdateModalOpen(false);
      setSelectedCountry(null);
      setFileSelected(false); // Dosyanın tekrar seçilmediğinden emin olun
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  

  useEffect(() => {
    // Seçilen blog değiştiğinde formdaki inputların değerlerini set et, update icin
    if (selectedCountry) {
      setValue('id', selectedCountry.id);
      setValue('image', selectedCountry.image);
      setValue('country', selectedCountry.country);
      setValue('code', selectedCountry.code);

    }
  }, [selectedCountry, setValue]);

  const createInformation = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('country', data.country);
    formData.append('code', data.code);

    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/country/create`, formData);
      setIsCreateModalOpen(false);
      toast.success(response.data.message) 

      //create isleimden sonra guncel veriyi al
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/country`);
      setData(newData.data.data);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
  //create elementi
  const createElement = (
    <form onSubmit={handleSubmit(createInformation)} encType="multipart/form-data">
      <Input id="country" title="Ülke Giriniz" type="text" placeholder="Ülke Giriniz" register={register} errors={errors} required />
      <Textarea id="code" title="Kodu Giriniz" type="text" placeholder="Kodu Giriniz" register={register} errors={errors} required />
      <Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors}  />
      <Button btnText={"Bilgi ekle"} />
    </form>
  )

  const updateElement = (
    <form onSubmit={handleSubmit(updateInformation)} encType="multipart/form-data">
      <Input id="country" title="Ülke Giriniz" type="text" placeholder="Ülke Giriniz" register={register} errors={errors} required />
      <Textarea id="code" title="kodu Giriniz" type="text" placeholder="kodu Giriniz" register={register} errors={errors} required />
      {<Input id="image" title="Gorsel Ekle" type="file" placeholder="Varsa Eklemek İstedikleriniz" register={register} errors={errors} onChange={() => setFileSelected(true)} />}
      {selectedCountry && selectedCountry.image && !fileSelected && <input ref={imageRef} id="image" title="Gorsel Ekle" type="hidden" value={selectedCountry.image || ""} placeholder="Varsa Eklemek İstedikleriniz" />}
    
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
                ülke
              </th>
              <th scope="col" class="px-6 py-3">
                Kodu
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
                    {item.country}
                  </td>
                  <td class="px-6 py-4">
                    {item.code}
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
      <Button onClick={() => setIsCreateModalOpen(true)} btnText={"Ülke Ekle"} />

      <Modal
        isOpen={isCreateModalOpen}
        title="Ülke Olustur"
        bodyElement={createElement}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
        btnNull
        modals

      />

      <Modal
        isOpen={isUpdateModalOpen}
        title="Ülke Güncelle"
        bodyElement={updateElement}
        onClose={() => { setIsUpdateModalOpen(!isUpdateModalOpen) }}
        btnNull
        modals

      />

    </div>
  )
}

export default Country
