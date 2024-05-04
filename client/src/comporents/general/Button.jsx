import React from 'react';

const Button = ({ btnText, url, right, center, onClick }) => {

    return (
        <div className={` flex my-3 ${center ? "justify-center" : ""} ${right ? "justify-end" : ""}  `}>

            <a href={url}>
                <button
                    onClick={onClick}
                    className={`bg-text-main hover:bg-blue-600 text-[15px] md:text-md text-white py-3.5 px-3 md:px-10 rounded-2xl `}
                >
                    {btnText}
                </button>
            </a>

        </div>
    );
};

export default Button;
