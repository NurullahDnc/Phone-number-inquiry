import React from 'react'
import HeadingTitle from '../general/HeadingTitle'

const PrivacyPolicy = () => {

  const PrivacyPolicyData = [
    {
      privacyStatement: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra eros id nisl dignissim, vitae varius libero blandit. Mauris auctor elit eu neque volutpat, id fermentum orci sagittis. Vestibulum convallis tristique ante, sed convallis purus eleifend id. Nulla facilisi. Duis luctus urna non eros maximus, vitae tincidunt nisi ullamcorper. Curabitur et lorem nec libero ultricies accumsan nec a ante. Sed vitae libero eros. Ut euismod libero ut enim lacinia, eu eleifend quam cursus. Cras tempor interdum orci sit amet venenatis. Integer nec ligula scelerisque, sollicitudin turpis id, eleifend leo. Fusce nec leo luctus, fermentum libero id, aliquet odio. Phasellus volutpat odio vitae semper tristique. Nullam fringilla ultricies purus, nec lacinia purus commodo vel.",
      dataAccess: "Integer dignissim ligula ac risus malesuada feugiat. In in diam eget mi placerat scelerisque. Proin at sapien nec urna posuere vehicula. Nam auctor metus sit amet urna scelerisque, et gravida enim ullamcorper. Vestibulum finibus tempus purus vel pharetra. Vivamus vel lorem pretium, hendrerit purus vitae, dapibus odio. Morbi fringilla tincidunt odio sit amet consequat. Quisque bibendum magna eu quam vehicula, eu cursus dui facilisis. Proin sollicitudin tincidunt eros nec feugiat. Etiam posuere velit nec lorem vehicula fermentum. Curabitur quis lorem quis lectus iaculis ultricies. Integer a sapien libero.",
      dataProtection: "Vestibulum sed lacus orci. Donec quis ligula sapien. In ultrices, justo sit amet tincidunt congue, nunc turpis tincidunt leo, sed tempus lorem metus vel metus. Morbi mattis lobortis libero, non tincidunt elit. Nulla facilisi. Cras maximus felis et lorem fringilla laoreet. Sed vestibulum enim nec nibh venenatis, ac interdum justo pharetra. Sed tempus justo at purus sodales, in venenatis mauris commodo. Nulla facilisi.",
      contact: "Aenean imperdiet vestibulum enim, at placerat odio mollis et. Proin nec urna non velit feugiat fermentum id eget odio. Integer at felis ut purus ultricies vulputate nec sit amet ligula. Nulla facilisi. Vestibulum vestibulum dolor ut sapien volutpat feugiat. Proin eget odio feugiat, fermentum lectus nec, tempor quam. Curabitur faucibus purus in justo vehicula, sit amet aliquet ipsum interdum. Duis ut dui felis. Curabitur quis ligula et quam suscipit dictum."

    }
  ];

  return (
    <div className='md:w-2/3 p-2 m-auto '>
      <div>
        <HeadingTitle small title={"Kisisel Verilerin Korunması"} />
      </div>


      {
        PrivacyPolicyData.map((item, i) => (
          <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <HeadingTitle xSmall title={"Gizlilik Politikası"} />
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
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

            <p class="text-sm text-gray-700 dark:text-gray-300">
              {item.contact}
            </p>



          </div>
        ))
      }

    </div>
  )
}

export default PrivacyPolicy
