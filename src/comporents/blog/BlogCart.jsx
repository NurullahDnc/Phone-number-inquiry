import React from 'react';
import Button from '../general/Button';
import TextSub from '../general/TextSub';
import { useNavigate } from 'react-router-dom';

const BlogCart = ({ id, image, title, description, btnText }) => {
    const router = useNavigate()

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                <a href="#" className="flex-grow">
                    <div className="h-48 overflow-hidden rounded-t-lg">
                        <img className="object-cover w-full h-full" src={image} alt="" />
                    </div>
                </a>
                <div className="p-3  flex flex-col flex-grow">
                    <a href="#">
                        <div className="h-14 overflow-hidden rounded-t-lg">
                            <h5 className="mb-2 text-lg lg:text-xl font-bold tracking-tight text-gray-700 dark:text-white">
                                <TextSub text={title} length={60} />

                            </h5>

                        </div>
                    </a>
                    <div className="h-32 overflow-hidden rounded-t-lg">

                        <p className="mb-3 text-sm lg:text-base font-normal indent-2 text-gray-700 dark:text-gray-400 flex-grow">
                            <TextSub text={description} length={150} />
                        </p>
                    </div>
                    <Button onClick={()=> router(`/detail/${id}`) } btnText={"Daha Fazla"} />
                </div>
            </div>
        </div>
    );
};

export default BlogCart;
