import React, { useState } from 'react';
import Button from '../general/Button';
import { useNavigate } from 'react-router-dom';
import Faq from '../general/Faq';
import HeadingTitle from '../general/HeadingTitle';


const Faqs = ({ faqs }) => {
  const route = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const seeCount = 2;

  return (
    <div >
      <Faq  count={"3"} seeCount={seeCount} btn />
    </div>
  );
};

export default Faqs;
