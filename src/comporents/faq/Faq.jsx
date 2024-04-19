import React from 'react'
import Faq from '../general/Faq'
import HeadingTitle from '../general/HeadingTitle';

const Faqs = () => {

    const exampleComments = [
        {
            title: "Bazı telefon numaraları neden yorumlara kapalı?",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, earum. Rem hic minus doloremque voluptas praesentium asperiores soluta cupiditate aperiam animi optio, maiores pariatur doloribus eligendi, similique in modi explicabo.'
        },
        {
            title: "Bazı telefon numaraları neden yorumlara kapalı?",
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            title: "Bazı telefon numaraları neden yorumlara kapalı?",
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: "Bazı telefon numaraları neden yorumlara kapalı?",
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ];

    return (
        <div className='md:w-2/3 p-2 m-auto my-3 '>

            <HeadingTitle title="Sık sorulan sorular" />
            {
                exampleComments.map((item, i) => (

                    <Faq key={i} title={item.title} description={item.description} />
                ))
            }


        </div>
    )
}

export default Faqs
