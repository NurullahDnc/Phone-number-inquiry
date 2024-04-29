import React from 'react';
import Comments from '../comporents/home/Comments';
import PageContainers from '../containers/PageContainers';
import Faqs from '../comporents/home/Faqs';
import PopularNumbers from '../comporents/home/PopularNumbers';
import IOSAppIntroduction from '../comporents/home/IOSAppIntroduction';

const Home = () => {
    return (
      <PageContainers>
            <Comments />
            <PopularNumbers />
            <Faqs />
            <IOSAppIntroduction />
      </PageContainers>
    );
};

export default Home;
