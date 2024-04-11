import React from 'react';

const Button = ({ btnText, onClick, center }) => {
    return (
        <div className={` flex my-3 ${center ? "justify-center" : ""}  `}>
            <button
                className={`bg-text-main hover:bg-blue-600 text-white py-2 px-10 rounded `}
                onClick={onClick}
            >
                {btnText}
            </button>
        </div>
    );
};

export default Button;