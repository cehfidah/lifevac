import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../utils/SEO';
import { FaShippingFast, FaGlobeAmericas, FaBoxOpen, FaQuestionCircle } from 'react-icons/fa';

const ShippingPolicy = () => {
    return (
        <>
            <SEO
                title="Shipping Policy - LifeVac | Fast & Reliable Delivery"
                description="Find detailed information on our fast and reliable shipping methods, estimated delivery timelines, and available regions for your LifeVac order. Your life-saving device will arrive quickly."
                keywords="LifeVac shipping, choking rescue device delivery, shipping times, delivery information, fast shipping"
                ogTitle="LifeVac Shipping Policy"
                ogDescription="Everything you need to know about our fast and reliable delivery process for your LifeVac device."
                twitterTitle="LifeVac Shipping Info"
                twitterDescription="Learn about how we ship your life-saving device and track your order every step of the way."
            />

            <div className="bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <FaShippingFast className="mx-auto h-12 w-12 text-blue-600" />
                        <h1 className="mt-4 text-4xl font-extrabold text-[#162950] sm:text-5xl">
                            Shipping Policy
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Fast, reliable, and transparent shipping to get your life-saving device to you promptly.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {/* Order Processing Section */}
                        <InfoCard
                            icon={<FaBoxOpen className="h-8 w-8 text-blue-600" />}
                            title="Order Processing"
                        >
                            <p>All orders are processed within <strong>1-2 business days</strong> (excluding weekends and holidays) after you receive your order confirmation email. You will receive another notification when your order has shipped.</p>
                        </InfoCard>

                        {/* Shipping Rates & Estimates Table */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-[#162950] mb-4">Domestic Shipping Rates & Estimates</h2>
                            <p className="text-gray-600 mb-6">Shipping charges for your order will be calculated and displayed at checkout. We offer several options to meet your needs.</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Option</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Delivery Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Standard Shipping</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">5-7 business days</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">Calculated at checkout</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Express Shipping</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">2-4 business days</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">Calculated at checkout</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* International Shipping Section */}
                        <InfoCard
                            icon={<FaGlobeAmericas className="h-8 w-8 text-blue-600" />}
                            title="International Shipping"
                        >
                            <p>We offer international shipping to most countries. Shipping charges and delivery times for your order will be calculated and displayed at checkout.</p>
                            <p className="mt-4 italic">Please note: Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. <strong>airwayclear.us</strong> is not responsible for these charges if they are applied; they are your responsibility as the customer.</p>
                        </InfoCard>

                        {/* Order Tracking Section */}
                        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                             <h2 className="text-2xl font-bold text-[#162950] mb-4">How do I check the status of my order?</h2>
                             <p className="text-gray-600 mb-6">When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
                             <Link to="/track-order" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                                Track Your Order
                             </Link>
                        </div>

                        {/* FAQs Section */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-[#162950] mb-6 flex items-center"><FaQuestionCircle className="mr-3 text-blue-600" />Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                <FAQItem title="What if my order is lost or stolen?">
                                    The buyer holds all responsibility for stolen or lost delivery as a result of inputting the wrong shipment information. Please double-check your shipping address before confirming your order. If you believe your package was lost in transit, please contact us at <a href="mailto:help@lifevacdevice.com" className="text-blue-600 underline">help@lifevacdevice.com</a> for assistance.
                                </FAQItem>
                                <FAQItem title="What about unexpected delays?">
                                    Delays imposed by shipping carriers (due to weather, high volume, or other unforeseen circumstances) are beyond our control. We appreciate your patience and will do everything we can to ensure your order reaches you as soon as possible.
                                </FAQItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Reusable component for info cards
const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg flex items-start space-x-6">
        <div className="flex-shrink-0">
            {icon}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-[#162950] mb-2">{title}</h2>
            <div className="text-gray-600 space-y-4">{children}</div>
        </div>
    </div>
);

// Reusable component for FAQ items
const FAQItem = ({ title, children }) => (
    <details className="p-4 border rounded-lg bg-gray-50">
        <summary className="font-semibold cursor-pointer">{title}</summary>
        <div className="mt-2 text-gray-600">
            {children}
        </div>
    </details>
);

export default ShippingPolicy;
