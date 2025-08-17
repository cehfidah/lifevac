import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEO from '../../utils/SEO';
import { toast } from 'react-toastify';
import Loading from '../../components/Common/Loading';
import { ApiHandler } from '../../helper/ApiHandler';
import { useDispatch } from 'react-redux';
import { setCredentials } from "../../store/slice/authSlice";
import OtpInput from 'react-otp-input';
import logo from "../../assest/logo.webp";

export default function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const email = location.state?.email || '';
    const [otp, setOtp] = useState('');
    
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (!email) {
            toast.error("No email address found. Redirecting to login.");
            navigate('/login');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResendOtp = async () => {
        if (!canResend) return;

        setLoading(true);
        setCanResend(false);
        try {
            const response = await ApiHandler("/login.php", "POST", { email }, undefined, dispatch, navigate);
            if (response.data.status === "1") {
                toast.success("A new OTP has been sent to your email.");
                setCountdown(60); // Reset the timer
            } else {
                toast.error(response.data.msg || "Failed to resend OTP.");
                setCanResend(true);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            setCanResend(true);
        } finally {
            setLoading(false);
        }
    };

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
                const getProfile = await ApiHandler("/get_profile.php", "POST", undefined, tokenPass, dispatch, navigate);
                
                if (getProfile.data.status === "1" && getProfile.data.data.length > 0) {
                    const user = getProfile.data.data[0];
                    dispatch(setCredentials({ token: tokenPass, user: user }));
                    toast.success("Verification successful! Welcome.");
                    navigate('/');
                } else {
                    toast.error("Could not retrieve your profile after verification.");
                }
            } else {
                toast.error(response.data.msg || "Invalid OTP.");
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
                title="Verify OTP | LifeVac - Secure Account Access"
                description="Enter the verification code sent to your email to securely access your LifeVac account. Your safety and security are our top priority."
            />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                    <Link to='/' className="flex justify-center items-center mb-6">
                        <img src={logo} width={250} alt="LifeVac Logo" />
                    </Link>

                    <div className="text-center">
                         <h3 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h3>
                         <p className="text-gray-600 mb-6">
                             We sent a verification code to <br />
                             <span className="font-semibold text-gray-800">{email}</span>
                         </p>
                    </div>

                    <form onSubmit={handleVerify}>
                        <div className="flex justify-center mb-6">
                       <OtpInput
    value={otp}
    onChange={setOtp}
    numInputs={6}
    renderSeparator={<span className="mx-1 md:mx-2">-</span>}
    renderInput={(props) => (
        <input
            {...props}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
        />
    )}
    containerStyle="justify-content-center"
    inputStyle="!w-10 !h-12 text-lg md:!w-12 md:!h-14 md:text-xl border border-gray-300 rounded-md text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
/>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-md font-semibold text-lg text-white transition ${otp.length === 6 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                            disabled={otp.length !== 6 || loading}
                        >
                            Verify
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Didn't get a code?{" "}
                            <button
                                onClick={handleResendOtp}
                                disabled={!canResend}
                                className={`font-semibold ${canResend ? 'text-blue-600 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
                            >
                                {canResend ? "Click to resend" : `Resend in ${countdown}s`}
                            </button>
                        </p>
                        <Link to='/login' className="text-sm text-gray-500 hover:underline mt-2 block">
                            Use a different email
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}