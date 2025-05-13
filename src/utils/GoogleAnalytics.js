import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-D8B4XSDHJ0"; // Replace with your GA4 Measurement ID

ReactGA.initialize(TRACKING_ID);

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return null;
};

export default GoogleAnalytics;
