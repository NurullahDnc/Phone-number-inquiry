import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Textarea from '../../general/Textarea';
import Button from '../../general/Button';
import Input from '../../general/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthManage from '../AuthManage';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {

  const route = useNavigate();
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
            if (!token) {
                // Token yoksa, istenilen sayfaya yönlendir
                route('/');
                return;
            }
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/admin`, {
                headers: {
                    Authorization: `jwt ${token.split('=')[1]}`
                }
            });
            setUserData(res.data);
            
        } catch (error) {
            console.error(error);
            toast.error("Hata Olustu")
        }
    };
    fetchData();
}, [route]);


    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  
 
    const handleUpdate = async (data) => {
        

        const passData ={
            oldPassword: data.oldPassword,
            password: data.password,
            password2: data.password2,
            id: userData._id


        }
          try {
            const userId = "662c222f5b47fc09735014c7"; // Örnek bir ObjectId değeri

            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/update/:${userData._id}`, passData);
            toast.success(response.data.message);
         
      
          } catch (error) {
            toast.error(error.response.data.error);
            console.log(Error);
          }      
        }
    
    
  return (
    <div className='px-1'>
      <AuthManage />

     <form onSubmit={handleSubmit(handleUpdate)} encType="multipart/form-data">
      <Input id="oldPassword" title="Eski Sifre" type="pass" placeholder="Eski Sifre" register={register} errors={errors} required />
      <Input id="password" title="Yeni Sifre" type="password" placeholder="Yeni Sifre" register={register} errors={errors} required />
      <Input id="password2" title="Yeni Sifre Tekrar Giriniz" type="password" placeholder="Yeni Sifre Tekrar Giriniz" register={register} errors={errors} required />

      <Button btnText={"Sifre Güncelle"} />
    </form>
  
    </div>
  )
}

export default PasswordReset
