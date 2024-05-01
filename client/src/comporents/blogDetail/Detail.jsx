import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetaTags from '../general/MetaTags';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${process.env.REACT_APP_BASE_URL}/blog/${id}`);
                setData(res.data.data);

                if (res.data.data.length > 0) {
                    setTitle(res.data.data[0].title);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const seoData = [
        {
            title: title,
            description: "Blog sayfası açıklaması buraya gelecek.",
            keywords: "icerikler"
        }
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {
                seoData.map((item, i) => (
                    <MetaTags
                        key={i}
                        title={item.title}
                        description={item.description}
                        keywords={item.keywords}

                    />
                ))
            }

            {
                data.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img className="w-full h-auto md:h-[400px] md:object-cover object-contain object-center" src={item.image} alt="image Yuklenmedi" />
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
