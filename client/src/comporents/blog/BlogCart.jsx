import React from 'react';
import Button from '../general/Button';
import TextSub from '../general/TextSub';
import { useNavigate } from 'react-router-dom';

const BlogCart = ({ id, image, title, description, btnText }) => {
    const router = useNavigate()

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 md:px-2 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                    <div className="h-48 overflow-hidden rounded-t-lg">
                        <img className="object-cover w-full h-full" src={image} alt="" />
                    </div>
                <div className="p-3  flex flex-col flex-grow">
                         <div className="h-14 overflow-hidden rounded-t-lg">
                            <h5 className="mb-2 text-lg lg:text-xl font-bold tracking-tight text-gray-700 dark:text-white">
                                <TextSub text={title} length={60} />

                            </h5>

                        </div>
                     <div className="h-32 overflow-hidden rounded-t-lg">

                        <p className="mb-3 text-sm lg:text-base font-[500] leading-1.5 text-[14.5px] md:text-[15px] indent-3 text-gray-600 dark:text-gray-300">
                            <TextSub text={description} length={150} />
                        </p>
                    </div>
                    <Button url={`/blog-detail/${id}/${title}`} btnText={"Daha Fazla"} />
                </div>
            </div>
        </div>
    );
};

export default BlogCart;
