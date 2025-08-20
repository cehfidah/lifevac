import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SEO from "../../utils/SEO";
// **FIXED**: Corrected cart actions import
import { addItemToCart, toggleCart } from "../../store/slice/cartSlice"; 

// COMPONENT IMPORTS
import LifeVacHero from "./component/LifeVacHero";
import LifeVacFeatures from "./component/LifeVacFeatures";
import ChokingTimeline from "./component/ChokingTimeline";
import StatsSection from "./component/StatsSection";
import AntiChokingSteps from "./component/AntiChokingSteps";
import ProductFeature from "./component/ProductFeature";
import ImageMarquee from "./component/ImageMarquee";
import ProductShowcase from "./component/ProductShowcase";
import Card from "./component/Card";
import OfferSelection from "./component/OfferSelection";
import TestimonialCarousel from "./component/TestimonialCarousel";
import FacebookTestimonials from "./component/FacebookTestimonials";
import ReviewGrid from "./component/ReviewGrid";
import TrustedByFamilies from "./component/TrustedByFamilies";
import ComparisonTable from "./component/ComparisonTable";
import FAQSection from "./component/FAQSection";
import TrustAirwaySection from "./component/TrustAirwaySection";
// **FIXED**: Corrected path for the arrow component
import ScrollToTopArrow from "./component/ScrollToTopArrow";
// **FIXED**: Corrected path for the offers data
import offers from "./component/offersData"; 

const Product = () => {
    const dispatch = useDispatch();
    const offerSectionRef = useRef(null);

    const handleTakeAction = () => {
        // Find the offer marked as the best seller, or default to the first one
        const bestOffer = offers.find(offer => offer.bestSeller) || offers[0];

        dispatch(addItemToCart({
            ...bestOffer,
            id: bestOffer.id || Date.now(),
            quantity: 1
        }));

        toast.success(`${bestOffer.title} added to cart!`);
        // **IMPROVEMENT**: Open the cart modal to show the user what happened
        dispatch(toggleCart());

        // Smoothly scroll down to the product selection area
        offerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <SEO
                title="LifeVac - The Official Life-Saving Anti-Choking Device"
                description="Trusted by thousands, LifeVac is the leading non-invasive choking rescue device. Safe for both adults and children. Order now for peace of mind."
                keywords="LifeVac, anti-choking device, choking rescue, life-saving device, first aid"
            />
            <div>
                {/* **FIXED**: Pass the onTakeAction handler to all relevant components */}
                <ProductShowcase onTakeAction={handleTakeAction} /> 
                <Card onTakeAction={handleTakeAction} /> 
                <ChokingTimeline onTakeAction={handleTakeAction}/> 
                <StatsSection onTakeAction={handleTakeAction} />
                <LifeVacHero onTakeAction={handleTakeAction} /> 
                <LifeVacFeatures onTakeAction={handleTakeAction} />
                <AntiChokingSteps onTakeAction={handleTakeAction} /> 
                <ProductFeature onTakeAction={handleTakeAction} /> 
                <ImageMarquee onTakeAction={handleTakeAction} />
                
               

                <TestimonialCarousel onTakeAction={handleTakeAction} />
                <FacebookTestimonials onTakeAction={handleTakeAction}/> 
                <TrustedByFamilies onTakeAction={handleTakeAction} /> 
                <ComparisonTable onTakeAction={handleTakeAction} /> 
<TrustAirwaySection onTakeAction={handleTakeAction} /> 
                <FAQSection onTakeAction={handleTakeAction} />
                <ScrollToTopArrow /> 
            </div>
        </>
    );
};

export default Product;
