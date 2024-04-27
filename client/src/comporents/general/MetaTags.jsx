import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title, description, keywords, author, canonical }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <link rel="canonical" href={canonical} />
            {/* Diğer meta etiketleri buraya eklenebilir */}
        </Helmet>
    );
};

export default MetaTags;
