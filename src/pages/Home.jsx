import React from 'react';
import Comments from '../comporents/home/Comments';
import PageContainers from '../containers/PageContainers';
import Faqs from '../comporents/home/Faqs';
import PopularNumbers from '../comporents/home/PopularNumbers';
import BlogSection from '../comporents/home/BlogSection';

const Home = () => {
    return (
      <PageContainers>
            <Comments />
            <PopularNumbers />
            <BlogSection />
            <Faqs />
      </PageContainers>
    );
};

export default Home;
