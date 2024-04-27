import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthManage = () => {
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


    return null; 
}


export default AuthManage;
