import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title, description, keywords, faviconUrl }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {faviconUrl && <link rel="icon" type="image/ico" href={faviconUrl} />}

            
        </Helmet>
    );
};

export default MetaTags;
