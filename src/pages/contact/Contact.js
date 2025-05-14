import { useNavigate } from 'react-router-dom';
import SEO from '../../utils/SEO';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loading from '../../components/Common/Loading';
import { ApiHandler } from '../../helper/ApiHandler';

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

        if (!name || !email || !phone || !comment) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        const payload = {
            name,
            email,
            phone,
            message: comment
        };

        try {
            const response = await ApiHandler("/contact_us.php", "POST", payload, undefined, dispatch, navigate);
            if (response.data.status === "1") {
                toast.success(response.data.msg);
                navigate('/');
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <SEO
                title="Contact Us - AirwayClear"
                description="Get in touch with AirwayClear support and sales teams. We’re here to help with any inquiries about our products or services."
                keywords="AirwayClear contact, customer support, air purifier help"
                ogTitle="Contact AirwayClear"
                ogDescription="Reach out to the AirwayClear team for support, questions, or collaboration opportunities."
                twitterTitle="Contact AirwayClear"
                twitterDescription="Speak to our support team or send us feedback."
            />

            <div className="min-h-screen bg-white px-4 py-12 flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold mb-4">Questions? We Have Answers!</h1>
                <p className="text-gray-600 max-w-xl">
                    While we usually respond to all emails <strong>within 24 hours</strong>, please allow <strong>up to 2 working days</strong> to receive a reply!
                </p>
                <p className='py-4 text-2xl'>-</p>
                <p className="text-gray-600">If you are missing your order confirmation email, <strong>please check your spam email folder.</strong></p>
                <p className='py-4 text-2xl'>-</p>
                <p className="text-gray-600 mb-6">Please track your order using our <strong>tracking page</strong>.</p>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl bg-white rounded-md space-y-4"
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment"
                        rows={4}
                        value={formData.comment}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded resize-none"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-[#0d2240] text-white py-2 rounded font-semibold hover:bg-[#0b1c33] transition"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Contact;
