import React, { useEffect, useState } from 'react'
import Faq from '../general/Faq'
import HeadingTitle from '../general/HeadingTitle';
import axios from 'axios';
import Button from '../general/Button';
import { useNavigate } from 'react-router-dom';

const Faqs = () => {


    const [data, setData] = useState([]);
    const route = useNavigate();
  
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

              <HeadingTitle small title="Sık sorulan sorular" />
              {
                  data.slice(0, 4).map((item, i) => (

                      <Faq key={i} title={item.title} description={item.description} />
                  ))
              }
              <Button btnText={"Daha Fazla"} onClick={()=> route("/faq") } /> 


        </div>
    )
}

export default Faqs
