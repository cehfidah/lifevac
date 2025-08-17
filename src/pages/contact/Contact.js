import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import SEO from '../../utils/SEO';
import { ApiHandler } from '../../helper/ApiHandler';
import Loading from '../../components/Common/Loading';
import { Link } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comment: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, comment } = formData;

        if (!name || !email || !comment) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setLoading(true);

        const payload = {
            name,
            email,
            phone,
            message: comment,
        };

        try {
            const response = await ApiHandler(
                '/contact_us.php',
                'POST',
                payload,
                undefined,
                dispatch,
                navigate
            );
            if (response.data.status === '1') {
                toast.success("Your message has been sent successfully!");
                setFormData({ name: '', email: '', phone: '', comment: '' }); // Clear form
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <SEO
                title="Contact Us - LifeVac Devices"
                description="Get in touch with the official LifeVac team. We're here to help with any inquiries about our life-saving devices, orders, or customer support."
                keywords="LifeVac contact, LifeVac customer service, choking rescue device support, official LifeVac help, product inquiries"
                ogTitle="Contact LifeVac - Your Life-Saving Device Support"
                ogDescription="Reach out to the LifeVac team for support, questions, or product information. We're here to help you breathe easier."
                twitterTitle="Contact LifeVac"
                twitterDescription="Speak to our support team about your LifeVac device or any questions you may have."
            />

            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-[#162950] sm:text-5xl">
                            Contact Us
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Have a question or need assistance? Our team is ready to help. Fill out the form below or use one of the contact methods to reach us.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side: Contact Form */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-[#162950] mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number (Optional)"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    name="comment"
                                    placeholder="Your Message *"
                                    rows={5}
                                    value={formData.comment}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-gray-300 rounded-md px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-[#0d2240] text-white py-3 rounded-md font-bold text-lg hover:bg-[#0b1c33] transition-transform transform active:scale-95"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Right Side: Contact Details & FAQs */}
                        <div className="space-y-8">
                            <ContactCard
                                icon={<FaEnvelope className="text-white" size={24} />}
                                title="Email Us"
                                description="For support, sales, or general inquiries."
                                contactInfo="info@airwayclear.us"
                                link="mailto:info@airwayclear.us"
                            />
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-[#162950] mb-3">Business Hours</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM (EST)</li>
                                    <li><strong>Response Time:</strong> We typically respond to all emails within 24 hours on business days.</li>
                                </ul>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-[#162950] mb-3 flex items-center"><FaQuestionCircle className="mr-2 text-blue-600"/>Quick Answers</h3>
                                <p className="text-gray-600">
                                    Missing a confirmation email? Please check your spam folder first. To check your order status, please use our{' '}
                                    <Link to="/track-order" className="text-blue-600 font-semibold hover:underline">
                                        tracking page
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Reusable component for contact detail cards
const ContactCard = ({ icon, title, description, contactInfo, link }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4">
        <div className="flex-shrink-0 bg-[#0d2240] p-4 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-[#162950]">{title}</h3>
            <p className="mt-1 text-gray-600">{description}</p>
            {link ? (
                 <a href={link} className="mt-2 inline-block text-blue-600 font-semibold hover:underline">
                    {contactInfo}
                </a>
            ) : (
                <p className="mt-2 text-gray-800 font-semibold">{contactInfo}</p>
            )}
        </div>
    </div>
);

export default Contact;
