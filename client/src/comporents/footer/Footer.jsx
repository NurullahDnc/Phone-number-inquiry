import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Footer = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/logo`);
        setData(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])
  return (

    <footer class="bg-text-main text-white rounded-lg shadow mt-10">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">

          {
            data.map((item, i) => (
              <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{item.logo} </span>
              </a>
            ))
          }

          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/ulke-alan-kodlari" class="hover:underline me-4 md:me-6"> Ülke Kodları</a>
            </li>
            <li>
              <a href="/kisisel-verilerin-korunmasi" class="hover:underline me-4 md:me-6">K.V.K.K Metni</a>
            </li>
            <li>
              <a href="/sikca-sorulan-sorular" class="hover:underline">S.S.S.</a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Gebeld™</a>. All Rights Reserved.</span>
      </div>
    </footer>


  )
}

export default Footer
