import React from 'react'
import SEO from '../../utils/SEO';

const PrivacyPolicy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy - AirwayClear"
                description="Review how AirwayClear handles your personal information, data collection, and privacy rights."
                keywords="AirwayClear privacy, data policy, personal data"
                ogTitle="Privacy Policy"
                ogDescription="Learn how we protect and use your data at AirwayClear."
                twitterTitle="Privacy Policy - AirwayClear"
                twitterDescription="Read about your privacy rights and our responsibilities."
            />

            <div className="max-w-3xl mx-auto px-4 py-10 text-sm text-gray-800 leading-relaxed">
                <h1 className="text-3xl font-bold text-center mb-8">Privacy policy</h1>

                <p className="mb-6">
                    This Privacy Policy describes how Whitts Sales And Marketing LLC (“we”, “us”, “our”) collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from our website.
                    By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy.
                </p>

                <h2 className="text-xl font-bold mb-2">Changes to This Privacy Policy</h2>
                <p className="mb-6">
                    We may update this Privacy Policy from time to time. We will post the revised Privacy Policy on the Site and update the "Last updated" date.
                </p>

                <h2 className="text-xl font-bold mb-2">How We Collect and Use Your Personal Information</h2>
                <p className="mb-6">
                    We collect personal information about you over the past 12 months from a variety of sources. The data depends on how you interact with us.
                </p>

                <h3 className="text-lg font-semibold mb-2">Information We Collect Directly from You</h3>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li><strong>Basic contact details</strong>: name, address, phone number, email.</li>
                    <li><strong>Order information</strong>: billing address, shipping address, payment confirmation, etc.</li>
                    <li><strong>Account information</strong>: username, password, security questions.</li>
                    <li><strong>Shopping information</strong>: items you view, cart, wishlist.</li>
                    <li><strong>Customer support information</strong>: messages you send to us.</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">Information We Collect through Cookies</h3>
                <p className="mb-6">
                    We use cookies, pixels, and similar technologies ("Cookies") to collect usage data: device info, browser info, IP address, and more.
                </p>

                <h3 className="text-lg font-semibold mb-2">Information We Obtain from Third Parties</h3>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Partners like Shopify for hosting and services.</li>
                    <li>Payment processors for billing info.</li>
                    <li>Marketing partners for targeted advertisements.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2">How We Use Your Personal Information</h2>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li><strong>Providing Products and Services</strong>: order processing, notifications, account management, etc.</li>
                    <li><strong>Marketing and Advertising</strong>: emails, ads, postal mail.</li>
                    <li><strong>Security and Fraud Prevention</strong>: investigating issues and protecting you.</li>
                    <li><strong>Communicating with you</strong>: customer support and updates.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2">Cookies</h2>
                <p className="mb-6">
                    We use cookies for analytics, site improvement, and personalized advertising. You can choose to block cookies via your browser settings.
                    Visit <a href="https://www.shopify.com/legal/cookies" className="text-blue-500 underline">Shopify Cookie Policy</a> for details.
                </p>

                <h2 className="text-xl font-bold mb-2">How We Disclose Personal Information</h2>
                <p className="mb-4">
                    We may share your data with third parties like vendors, business partners, affiliates, and legal entities as required.
                </p>

                <table className="w-full text-left border border-gray-300 text-sm mb-10">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Categories of Recipients</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">
                                - Identifiers (e.g., name, email)<br />
                                - Commercial info (e.g., purchases)<br />
                                - Internet or other similar network activity
                            </td>
                            <td className="border px-4 py-2">
                                - Vendors and service providers (e.g., payment processors)<br />
                                - Business and marketing partners<br />
                                - Affiliates
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PrivacyPolicy;
