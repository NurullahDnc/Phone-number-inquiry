import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../general/Input';
import Textarea from '../general/Textarea';
import Button from '../general/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CommentFeedback = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { id } = useParams()
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);

  const handleClick = async (data) => {
    const formData = {
      id: id,
      surname: data.surname,
      mail: data.mail,
      description: data.description
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/commentFeedback/create`, formData);
      toast.success(res.data.message);

      setValue('surname', '');
      setValue('mail', '');
      setValue('description', '');

    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment`);
        //istenilen numarayı bul
        const findNumber = res.data.data.find((item) => item._id == id);
        setPhoneNumber("as", findNumber)

        setSelectedPhone(findNumber?.number ?? id);

      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div className="max-w-4xl mx-auto px-4 py-5">
      <div className=' text-center py-8 flex justify-center items-center'>
        <h1 className='font-bold text-sm md:text-2xl dark:text-gray-400'>Telefon Numarası: </h1> <span className='text-sm md:text-2xl px-3 dark:text-gray-100'>{selectedPhone?.number} </span>
      </div>

      <form onSubmit={handleSubmit(handleClick)} encType="multipart/form-data">
        <Input id="surname" type="text" title="Ad Soyad" placeholder={`Ad Soyad Giriniz`} rows={7} register={register} errors={errors} required />
        <Input id="mail" type="text" title="E-Posta" placeholder={`E-Posta Giriniz`} rows={7} register={register} errors={errors} required />

        <Textarea id="description" type="text" title="Acıklama" placeholder={`Bu telefon numarasına ait yorumun kaldırılması için nedeniniz Yazınız`} rows={7} register={register} errors={errors} required />

        <Button right btnText="Gönder" />
      </form>
    </div>
  )
}

export default CommentFeedback
