import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SEO from '../../utils/SEO';
import { toast } from 'react-toastify';
import Loading from '../../components/Common/Loading';
import { ApiHandler } from '../../helper/ApiHandler';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/slice/authSlice';

export default function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);

        const payload = { email, otp };

        try {
            const response = await ApiHandler("/verify_otp.php", "POST", payload, undefined, dispatch, navigate);
            if (response.data.status === "1") {
                const tokenPass = response.data.data.token;
                dispatch(setAuth(tokenPass));
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
                title="Verify OTP - AirwayClear"
                description="Enter the verification code sent to your email."
                keywords="verify otp, email code, AirwayClear authentication"
                ogTitle="OTP Verification"
                ogDescription="Enter the code we sent to continue."
                twitterTitle="OTP - AirwayClear"
                twitterDescription="Securely login to AirwayClear using the OTP sent to your email."
            />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
                    <Link to='/' className="flex items-center justify-center text-center text-2xl font-semibold mb-6">AirwayClear 🌀🌀🌀🌀</Link>

                    <h3 className="text-lg font-medium text-start mb-2">Verify OTP</h3>
                    <p className="text-sm text-start text-gray-500 mb-6">
                        Send to <span className="font-semibold">{email}</span>
                    </p>

                    <form onSubmit={handleVerify}>
                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-center tracking-widest font-medium text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-md font-medium transition ${otp.length === 6
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={otp.length !== 6}
                        >
                            Continue
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <Link
                            to='/login'
                            className="text-sm text-gray-600 hover:underline mb-2 block"
                        >
                            Log in with a different email
                        </Link>
                        <Link
                            to="/privacy-policy"
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
