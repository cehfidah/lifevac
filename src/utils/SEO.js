import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const SEO = ({
    title,
    description = "Find the best used bikes at AirwayClear - trusted respiratory solutions for healthier breathing.",
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    image = "",
    keywords
}) => {
    const location = useLocation();  // Get current page path dynamically
    const canonicalUrl = `https://airwayclear.ffnewsupdater.xyz${location.pathname}`; // Create full canonical URL

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="category" content="Auto" />
            <meta name="language" content="en" />
            <link rel="canonical" href={canonicalUrl} /> {/* Correct Canonical URL */}
            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="AirwayClear" />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:description" content={ogDescription || description} />
            <meta name="twitter:title" content={twitterTitle || title} />
            <meta name="twitter:description" content={twitterDescription || description} />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="keywords"
                content={`${keywords}, AirwayClear, respiratory health, asthma, nebulizer, COPD, breathing solutions`} />
        </Helmet>
    );
};

export default SEO;
