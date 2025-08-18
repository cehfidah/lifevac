import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const SEO = ({
    title = "LifeVac - The Leading Anti-Choking and Airway Clearance Device",
    description = "LifeVac is a non-invasive, life-saving airway clearance device for choking emergencies. Safe and effective for all ages. Be prepared to save a life.",
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    image = "",
    keywords
}) => {
    const location = useLocation(); // Get current page path dynamically
    const canonicalUrl = `https://lifevacdevice.com${location.pathname}`; // Create full canonical URL

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="category" content="Health" />
            <meta name="language" content="en" />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="LifeVac" />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:description" content={ogDescription || description} />
            <meta name="twitter:title" content={twitterTitle || title} />
            <meta name="twitter:description" content={twitterDescription || description} />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="keywords"
                  content={`${keywords}, LifeVac, anti-choking device, choking rescue device, airway clearance, choking first aid, baby choking, child choking, emergency choking device, dechoker`} />
        </Helmet>
    );
};

export default SEO;