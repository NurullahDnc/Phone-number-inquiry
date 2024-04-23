import React, { useEffect, useState } from 'react'
import BlogCart from './BlogCart';
import axios from 'axios';

const Blog = () => {

    
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios(`${process.env.REACT_APP_BASE_URL}/blog`);
            setData(res.data.data)
          } catch (error) {
            console.log(error);
          }
        }
        fetchData()
      }, [])

  return (
    <div>
        
        <div className='flex flex-wrap justify-center my-7 mx-5'>
        {
            data.map((item, i)=>(

                <BlogCart id={item._id} title={item.title} image={item.image} description={item.description} key={i} />
            ))
        }
        </div>


    </div>
  )
}

export default Blog
