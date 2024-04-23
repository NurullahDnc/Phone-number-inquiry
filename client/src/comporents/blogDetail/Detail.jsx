import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/blog/${id}`);
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {
                data.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img className="w-full h-64 object-cover object-center" src={item.image} alt="image Yuklenmedi" />
                        <div className="p-6">
                            <h2 className="text-3xl font-semibold text-gray-800">{item.title} </h2>
                            <p className="mt-2 text-gray-600">{item.description} </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Detail;
