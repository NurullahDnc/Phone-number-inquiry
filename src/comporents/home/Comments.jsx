import React from 'react'
import Comment from '../general/Comment';
import HeadingTitle from '../general/HeadingTitle';
import Button from '../general/Button';

const Comments = () => {

    const exampleComments = [
        {
            number: '543452652',
            country: 'Turkey',
            status: 'dangerous',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, earum. Rem hic minus doloremque voluptas praesentium asperiores soluta cupiditate aperiam animi optio, maiores pariatur doloribus eligendi, similique in modi explicabo.'
        },
        {
            number: '1234567890',
            country: 'USA',
            status: 'trustworthy',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            number: '9876543210',
            country: 'UK',
            status: 'uncertain',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            number: '5555555555',
            country: 'Germany',
            status: 'dangerous',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
        },
        {
            number: '9999999999',
            country: 'France',
            status: 'trustworthy',
            description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
        {
            number: '5555555555',
            country: 'Germany',
            status: 'dangerous',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
        },
        {
            number: '9999999999',
            country: 'France',
            status: 'trustworthy',
            description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        }
    ];

    return (
        <div>
            <HeadingTitle title="Son Eklenen Yorumlar"   />
            <div className='md:flex justify-between  ' >
               

                <div className=' flex-1 md:px-4 '>

                    {exampleComments.slice(0, 5).map((item, index) => (
                        <Comment
                            key={index}
                            number={item.number}
                            country={item.country}
                            status={item.status}
                            description={item.description}
                        />
                    ))}


                </div>

                <div className='shadow-lg flex justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] '>
                    Ads
                </div>
            </div>

        </div>
    )
}

export default Comments
