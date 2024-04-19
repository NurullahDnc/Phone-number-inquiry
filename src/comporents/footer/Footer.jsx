import React from 'react'

const Footer = () => {
  const logo = [
    {
      logo: "Gebeld"
    }
  ]

  return (

    <footer class="bg-text-main text-white rounded-lg shadow mt-10">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">

          {
            logo.map((item, i) => (
              <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{item.logo} </span>
              </a>
            ))
          }

          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/countrycode" class="hover:underline me-4 md:me-6"> Ülke Kodları</a>
            </li>
            <li>
              <a href="/privacyPolicy" class="hover:underline me-4 md:me-6">K.V.K.K Metni</a>
            </li>
            <li>
              <a href="/faq" class="hover:underline">S.S.S.</a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Gebeld™</a>. All Rights Reserved.</span>
      </div>
    </footer>


  )
}

export default Footer
