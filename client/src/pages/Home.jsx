import React from 'react';
import Comments from '../comporents/home/Comments';
import PageContainers from '../containers/PageContainers';
import Faqs from '../comporents/home/Faqs';
import PopularNumbers from '../comporents/home/PopularNumbers';
import IOSAppIntroduction from '../comporents/home/DownloadSection';

const Home = () => {
    return (
     <>
      <PageContainers>
            <Comments />
            <PopularNumbers />
            <Faqs />
      </PageContainers>
            <IOSAppIntroduction />
     </>
    );
};

export default Home;
