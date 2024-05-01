import React, { useEffect, useState } from 'react'
import BlogCart from './BlogCart';
import axios from 'axios';
import MetaTags from '../general/MetaTags';

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

  const seoData =[
    {
      title: "Blog",
      description: "Blog sayfası açıklaması buraya gelecek.",
      keywords: "icerikler"
    }
  ]

  return (
    <div>

    {
      seoData.map((item, i)=>(
        <MetaTags
        title={item.title}
        description={item.description}
        keywords={item.keywords}

      />
      ))
    }

      <div className='flex flex-wrap justify-center my-7 md:mx-5'>
        {
          data.map((item, i) => (

            <BlogCart id={item._id} title={item.title} image={item.image} description={item.description} key={i} />
          ))
        }
      </div>


    </div>
  )
}

export default Blog
