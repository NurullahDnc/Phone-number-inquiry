import React from "react";
import { IoClose } from "react-icons/io5";
import Button from "../general/Button";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  btnLabel,
  title,
  bodyElement,
  footerElement,
}) => {
  const closeFunc = () => {
    onClose();
  };

  const submitFunc = () => {
    onSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-black bg-opacity-70 fixed flex z-1000 top-0 left-0 overflow-auto items-center justify-center w-full h-full">
      <div className="bg-white rounded-lg  w-full md:w-1/2 p-5">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div className="text-xl">{title}</div>
          <div className="cursor-pointer" onClick={closeFunc}>
            <IoClose size={28} />
          </div>
        </div>

        {/* İçerik ortada gösterilecek olan */}
        {bodyElement}

        {/* <Button onClick={submitFunc} btnText={btnLabel} /> */}

        {/* Footer elementi */}
        {/* {footerElement} */}
      </div>
    </div>
  );
};

export default Modal;
