import React, { useEffect, useState } from 'react'
import Faq from '../general/Faq'
import HeadingTitle from '../general/HeadingTitle';
import axios from 'axios';

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

    return (
        <div className=' p-2 m-auto my-3 '>

            <HeadingTitle title="Sık sorulan sorular" />
            {
                data.map((item, i) => (

                    <Faq key={i} title={item.title} description={item.description} />
                ))
            }


        </div>
    )
}

export default Faqs
