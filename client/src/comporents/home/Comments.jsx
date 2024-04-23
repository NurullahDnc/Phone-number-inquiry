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
        <div>
            <HeadingTitle title="Son Eklenen Yorumlar" center />
            <div className='md:flex justify-between  ' >

                <div className='shadow-lg flex justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] dark:bg-gray-800 '>
                    Ads
                </div>

                <div className=' flex-1 md:px-4 '>

                    {comment.slice(0, 5).map((item, index) => (
                        <Comment
                            key={index}
                            id={item._id}
                            number={item.number?.number}
                            numberId={item.number?._id}
                            country={item.number?.countryName}
                            status={item.status}
                            description={item.comment}
                        />
                    ))}


                </div>

                <div className='shadow-lg flex justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] dark:bg-gray-800 '>
                    Ads
                </div>
            </div>

        </div>
    )
}

export default Comments
