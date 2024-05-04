import React, { useEffect, useState } from 'react'
import BlogCart from './BlogCart';
import axios from 'axios';
import MetaTags from '../general/MetaTags';
import Breadcrumbs from '../general/Breadcrumbs';

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

    
  const [seoData, setSeoData] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
        try {
          const res = await axios(`${process.env.REACT_APP_BASE_URL}/seo/detail`);
           setSeoData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, []);

  const page = [
    { page1: 'Ana Sayfa', url1: '/', page2: "Blog", url2: '/blog',   },

  ];

  return (
    <div>
     
      {
        seoData.map((item, i) => (
          <MetaTags
          key={i}
            title={"Blog"}
            description={item.description}
            keywords={item.keywords}

          />
        ))
      }

      <div className=' my-7 md:mx-5'>
      {page.map((item, index) => (
        <Breadcrumbs key={index} page1={item.page1} url1={item.url1} page2={item.page2} url2={item.url2}  />
      ))}
       <div className='flex flex-wrap justify-center'>
       {
          data.map((item, i) => (

            <BlogCart id={item._id} title={item.title} image={item.image} description={item.description} key={i} />
          ))
        }
       </div>
      </div>


    </div>
  )
}

export default Blog
