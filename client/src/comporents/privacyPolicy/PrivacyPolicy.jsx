import React, { useEffect, useState } from 'react'
import HeadingTitle from '../general/HeadingTitle'
import axios from 'axios';

const PrivacyPolicy = () => {

 

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/privacyPolicy`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <div className='md:w-2/3 p-2 m-auto '>
      <div>
        <HeadingTitle small title={"Kisisel Verilerin Korunması"} />
      </div>


      {
        data.map((item, i) => (
          <div class="bg-gray-100 dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-md">
            <HeadingTitle xSmall title={"Gizlilik Politikası"} />
            <p class="text-sm text-gray-800 dark:text-gray-300 mb-2">
              {item.privacyStatement}
            </p>
            <HeadingTitle xSmall title={"Kişisel verilere kimin erişimi vardır?"} />

            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {item.dataAccess}
            </p>
            <HeadingTitle xSmall title={"Kişisel bilgiler nasıl korunur?"} />

            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {item.dataProtection}
            </p>
            <HeadingTitle xSmall title={"İletişim Bilgilerimiz"} />

            {/* metinde bosluk varsa alt satıra at */}
            {item.contact.split('\n').map((line, index) => (
              <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                {line}
              </p>
            ))}



          </div>
        ))
      }

    </div>
  )
}

export default PrivacyPolicy
