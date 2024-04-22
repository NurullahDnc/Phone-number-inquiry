import React from 'react';
import Comments from '../comporents/home/Comments';
import PageContainers from '../containers/PageContainers';
import Faqs from '../comporents/home/Faqs';
import PopularNumbers from '../comporents/home/PopularNumbers';
import Information from '../comporents/home/Information';

const Home = () => {
    return (
      <PageContainers>
            <Comments />
            <PopularNumbers />
            <Information />
            <Faqs />
      </PageContainers>
    );
};

export default Home;
