import React, { useEffect, useState } from 'react'
import Button from '../../general/Button'
import Input from '../../general/Input'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const route = useNavigate()
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
                if (token) {
                    // Token yoksa, istenilen sayfaya yönlendir
                    route('/admin');
                    return;
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [route]);



    const handleLogin = async (data) => {
        const passData = {
            email: data.email,
            password: data.password,
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, passData);
            const token = response.data.accessToken;
            toast.success(response.data.message);
            document.cookie = `jwt=${token}; max-age=${7 * 24 * 60 * 60}; path=/`;
            route("/admin/")
            localStorage.setItem('token', token);

        } catch (error) {
            toast.error(error.response.data.error);
            console.error(error);
        }
    };

    return (
        <div className=' h-screen flex justify-center items-center'>


            <form onSubmit={handleSubmit(handleLogin)} class=" w-full md:w-1/2 lg:w-1/4 mx-auto border-1 bg-gray-200 p-5 border-red-200 shadow-md ">
                <div class="mb-5">

                    <Input id="email" title="E-Posta" type="text" placeholder="E-posta" register={register} errors={errors} required />
                </div>
                <div class="mb-5">
                    <Input id="password" title="Sifre" type="password" placeholder="Sifre" register={register} errors={errors} required />
                </div>

                <Button center btnText={"Giriş Yap"} />
            </form>

        </div>
    )
}

export default Login
