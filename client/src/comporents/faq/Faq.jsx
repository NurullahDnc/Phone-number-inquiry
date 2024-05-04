import React, { useEffect, useState } from 'react'
import Faq from '../general/Faq'
import HeadingTitle from '../general/HeadingTitle';
import axios from 'axios';
import MetaTags from '../general/MetaTags';
import Breadcrumbs from '../general/Breadcrumbs';

const Faqs = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/faq`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  const seeCount = 0;

  const seoData = [
    {
      title: "sikca-sorulan-sorular",
      description: "Blog sayfası açıklaması buraya gelecek.",
      keywords: "icerikler"
    }
  ]

  const page = [
    { page1: 'Ana Sayfa', url1: '/', page2: "Sıkca Sorulan sorular" },

  ];

  return (
    <div className=' p-2  m-auto  md:my-7 '>
      {page.map((item, index) => (
        <Breadcrumbs key={index} page1={item.page1} url1={item.url1} page2={item.page2} />
      ))}

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
      <Faq count={"100"} seeCount={seeCount} />

    </div>
  )
}

export default Faqs
