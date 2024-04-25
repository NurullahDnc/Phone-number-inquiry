import React from 'react'
import Button from '../../general/Button'
import Input from '../../general/Input'
import { useForm } from 'react-hook-form';
import axios from 'axios';


const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        try {
          const response = await axios.post('/auth/login', data);
          const token = response.data.token;
          localStorage.setItem('token', token); // Token'i tarayıcı yerel depolama (localStorage) içinde saklayın
          window.location.reload(); // Sayfayı yenileyerek yeni oturumu başlatın

        } catch (error) {
          console.error('Login error:', error);
        }
      };

    return (
        <div className=' h-screen flex justify-center items-center'>


            <form  onSubmit={handleSubmit(handleLogin)}  class="w-1/4 mx-auto border-1 bg-gray-200 p-5 border-red-200 shadow-md ">
                <div class="mb-5">

                    <Input id="title" title="E-Posta" type="text" placeholder="E-posta" register={register} errors={errors} required />
                </div>
                <div class="mb-5">
                    <Input id="title" title="Sifre" type="text" placeholder="Sifre" register={register} errors={errors} required />
                </div>

                <Button center btnText={"Giriş Yap"} />
            </form>

        </div>
    )
}

export default Login
