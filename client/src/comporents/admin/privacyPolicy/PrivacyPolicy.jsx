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


const PrivacyPolicy = () => {

  const [data, setData] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPrivacyPolicy, setSelectedPrivacyPolicy] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/privacyPolicy`);
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
    //secilen blog bul, state at
    const selectedPrivacyPolicys = data.find(blog => blog._id === id);
    setSelectedPrivacyPolicy(selectedPrivacyPolicys);
    setIsUpdateModalOpen(true);
  }


  const updatePrivacyPolicy = async (data) => {


    const updatedata = {
      privacyStatement: data.privacyStatement,
      dataAccess: data.dataAccess,
      dataProtection: data.dataProtection,
      contact: data.contact,
    };


    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/privacyPolicy/update/${selectedPrivacyPolicy._id}`, updatedata);
      toast.success(response.data.message);
      const newData = await axios(`${process.env.REACT_APP_BASE_URL}/privacyPolicy`);
      setData(newData.data.data);

      setIsUpdateModalOpen(false);
      setSelectedPrivacyPolicy(null);

    } catch (error) {
      toast.error(error.response.data.error);
      console.log(Error);
    }
  }
  useEffect(() => {
    // Seçilen blog değiştiğinde formdaki inputların değerlerini set et, update icin
    if (selectedPrivacyPolicy) {
      setValue('id', selectedPrivacyPolicy.id);
      setValue('privacyStatement', selectedPrivacyPolicy.privacyStatement);
      setValue('dataAccess', selectedPrivacyPolicy.dataAccess);
      setValue('dataProtection', selectedPrivacyPolicy.dataProtection);
      setValue('contact', selectedPrivacyPolicy.contact);



    }
  }, [selectedPrivacyPolicy, setValue]);

  const updateElement = (
    <form onSubmit={handleSubmit(updatePrivacyPolicy)} encType="multipart/form-data">
      <Textarea id="privacyStatement" title="gizlilik Bildirimi" type="text" placeholder="gizlilik Bildirimi" register={register} errors={errors} required />
      <Textarea id="dataAccess" title="veri Erişimi" type="text" placeholder="veri Erişimi" register={register} errors={errors} required />
      <Textarea id="dataProtection" title="veri koruması" type="text" placeholder="veri koruması" register={register} errors={errors} required />
      <Textarea id="contact" title="iletisim" type="text" placeholder="iletisim" register={register} errors={errors} required />

      <Button btnText={"Veri Politikası Güncelle"} />
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
                Gizlilik Bildirimi
              </th>
              <th scope="col" class="px-6 py-3">
                Veri Erişimi
              </th>
              <th scope="col" class="px-6 py-3">
                veri Koruması
              </th>
              <th scope="col" class="px-6 py-3">
                iletişim
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
                    {item.privacyStatement}
                  </td>
                  <td class="px-6 py-4">
                    {item.dataAccess}
                  </td>
                  <td class="px-6 py-4">
                    {item.dataProtection}
                  </td>
                  <td class="px-6 py-4">
                    {item.contact}
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
        title="Veri Politikasını Güncelle"
        bodyElement={updateElement}
        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        btnNull
        modals

      />

    </div>
  )
}

export default PrivacyPolicy
