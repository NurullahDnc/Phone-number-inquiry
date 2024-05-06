import React, { useEffect, useState } from 'react'
import Comment from '../general/Comment';
import HeadingTitle from '../general/HeadingTitle';
import Button from '../general/Button';
import axios from 'axios';

const Comments = () => {


    const [comment, setComment] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment`);
                setComment(res.data.data)
            } catch (error) {
                console.log(error);

            }
        }

        fetchData()
    }, [])

    return (
        <div className='mt-7'>
            <div className="shadow-lg flex justify-center items-center w-full md:w-full h-[250px] md:h-[300px] bg-red-600 rounded-lg dark:bg-gray-800 ">
                Ads
            </div>

            <HeadingTitle small title="Sisteme eklenen son yorumlar" center />
            <div className='md:flex justify-between  ' >

                <div className='shadow-lg flex justify-center items-center bg-red-600 rounded-lg w-full md:w-1/6 h-[250px] md:h-[500px] dark:bg-gray-800 '>
                    Ads
                </div>

                <div className=' flex-1 md:mx-3 lg:mx-6 my-7 md:my-0 p-2 dark:bg-gray-700 '>

                    {comment.slice(0, 10).map((item, index) => (
                        <Comment
                            key={index}
                            minLength="40"
                            maxLength="90"
                            id={item._id}
                            number={item.number?.number}
                            numberId={item.number?._id}
                            country={item.number?.countryName}
                            status={item.status}
                            description={item.comment}
                        />
                    ))}


                </div>

                <div className='shadow-lg flex justify-center bg-red-600 rounded-lg items-center w-full md:w-1/6 h-[250px] md:h-[500px] dark:bg-gray-800 '>
                    Ads
                </div>
            </div>

        </div>
    )
}

export default Comments
