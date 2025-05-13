import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../utils/SEO';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault(); // ✅ fixed typo
        if (!email.trim()) return;

        // TODO: Replace with actual API call
        toast.success(`Sending OTP to: ${email}`); // ✅ fixed toast

        // Navigate to OTP verification page, pass email
        navigate('/verify-otp', { state: { email } });
    };

    const isEmailValid = email.trim() !== '';

    return (
        <>
            <SEO
                title="Login - AirwayClear"
                description="Sign in to your AirwayClear account to access your orders, profile settings, and more."
                keywords="AirwayClear login, sign in, user access"
                ogTitle="Login to AirwayClear"
                ogDescription="Access your dashboard and order information."
                twitterTitle="Login - AirwayClear"
                twitterDescription="Enter your credentials to sign in."
            />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
                    <h2 className="text-center text-2xl font-semibold mb-6">AirwayClear 🌀🌀🌀🌀</h2>

                    <h3 className="text-lg font-medium text-center mb-4">Log in</h3>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        Choose how you’d like to log in
                    </p>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition mb-4 font-medium">
                        Sign in with shop
                    </button>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-3 text-gray-500 text-sm">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <form onSubmit={handleSendOtp}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            type="submit"
                            disabled={!isEmailValid}
                            className={`w-full py-3 rounded-md font-medium transition ${isEmailValid
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </form>

                    <p className="text-xs text-center text-gray-500 mt-6">
                        <a href="#" className="underline">Privacy</a>
                    </p>
                </div>
            </div>
        </>
    );
}
