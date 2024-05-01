import React from 'react';

const Button = ({ btnText, url, right, center,  }) => {

    return (
        <div className={` flex my-3 ${center ? "justify-center" : ""} ${right ? "justify-end" : ""}  `}>

              <a href={url}>
              <button
                    className={`bg-text-main hover:bg-blue-600 text-white py-2 px-10 rounded `}
                 >
                    {btnText}
                </button>
              </a>
                
        </div>
    );
};

export default Button;
