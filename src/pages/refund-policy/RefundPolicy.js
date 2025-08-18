import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../utils/SEO';
import { FaUndo, FaHeartbeat, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';

const RefundPolicy = () => {
    return (
        <>
            <SEO
                title="Refund Policy - LifeVac | Returns & Replacements"
                description="Learn about our official LifeVac refund and return policy. We offer a free replacement if your device is used to save a life. Find out how to request a refund or return."
                keywords="LifeVac refund, LifeVac return policy, free replacement, LifeVac returns, product returns"
                ogTitle="LifeVac Refund & Return Policy"
                ogDescription="Understand our transparent refund policy and our promise to replace any LifeVac kit used to save a life."
                twitterTitle="LifeVac Refund Policy"
                twitterDescription="Learn about our free replacement policy and how to request a refund for a LifeVac purchase."
            />

            <div className="bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <FaUndo className="mx-auto h-12 w-12 text-blue-600" />
                        <h1 className="mt-4 text-4xl font-extrabold text-[#162950] sm:text-5xl">
                            Refund & Return Policy
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Your satisfaction and peace of mind are our top priorities. Here’s how we handle returns and replacements.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {/* 30-Day Return Policy Section */}
                        <InfoCard
                            icon={<FaUndo className="h-8 w-8 text-blue-600" />}
                            title="30-Day Satisfaction Guarantee"
                        >
                            <p>We have a 30-day return policy, which means you have <strong>30 days</strong> after receiving your item to request a return if you are not satisfied.</p>
                            <p className="mt-4"><strong>Eligibility for a Return:</strong></p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
                                <li>The item must be in the same condition that you received it: unused and in its original packaging.</li>
                                <li>You will need the receipt or proof of purchase.</li>
                                <li>Items sent back to us without first requesting a return will not be accepted.</li>
                            </ul>
                        </InfoCard>

                        {/* Life-Saving Replacement Section */}
                        <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg text-center">
                            <FaHeartbeat className="mx-auto h-12 w-12" />
                            <h2 className="mt-4 text-2xl font-bold">Used LifeVac in an Emergency?</h2>
                            <p className="mt-2 max-w-2xl mx-auto">If you ever use your LifeVac device to save a life, we will replace it for <strong>FREE</strong>. Simply contact us and share your story. It's our way of ensuring you're always prepared.</p>
                             <a href="mailto:info@lifevacdevice.com" className="mt-6 inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                                Report a Life Saved
                             </a>
                        </div>

                        {/* How to Start a Return Section */}
                        <InfoCard
                            icon={<FaEnvelope className="h-8 w-8 text-blue-600" />}
                            title="How to Start a Return"
                        >
                            <p>To start a return, please contact us at our dedicated support email. We will guide you through the process and provide you with all the necessary instructions.</p>
                             <a href="mailto:info@lifevacdevice.com" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
                                Email: info@lifevacdevice.com
                             </a>
                        </InfoCard>

                        {/* FAQs Section */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-[#162950] mb-6 flex items-center"><FaQuestionCircle className="mr-3 text-blue-600" />Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                <FAQItem title="What if my item is damaged or I received the wrong product?">
                                    Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
                                </FAQItem>
                                <FAQItem title="Are there any non-returnable items?">
                                    Yes, we cannot accept returns on gift cards or sale items. If you have questions about a specific item, please get in touch.
                                </FAQItem>
                                <FAQItem title="How long do refunds take?">
                                    We will notify you once we’ve received and inspected your return. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process the refund. If more than 15 business days have passed since approval, please contact us.
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

export default RefundPolicy;
