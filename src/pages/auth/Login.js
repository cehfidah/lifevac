import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../utils/SEO";
import { toast } from "react-toastify";
import Loading from "../../components/Common/Loading";
import { ApiHandler } from "../../helper/ApiHandler";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assest/logo.png";
import { setCredentials } from "../../store/slice/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmailValid = email.trim() !== "";

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const payload = { email };

    try {
      const response = await ApiHandler(
        "/login.php",
        "POST",
        payload,
        undefined,
        dispatch,
        navigate
      );
      if (response.data.status === "1") {
        toast.success(response.data.msg);
        navigate("/verify-otp", { state: { email } });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async () => {
    setLoading(true);

    const subtotal = cartItems.reduce((sum, item) => {
      if (item.type === "guide") {
        return sum + Number(item.extraPrice || 0);
      }
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    try {
      const response = await ApiHandler(
        "/guest_login.php",
        "POST",
        undefined,
        undefined,
        dispatch,
        navigate
      );
      if (response.data.status === "1") {
        const tokenPass = response.data.data.token;
        // **FIXED**: Use setCredentials with a placeholder user for guests
        dispatch(setCredentials({ token: tokenPass, user: { firstName: 'Guest', lastName: '' } }));
        toast.success(response.data.msg);
        navigate("/checkouts", { state: { subtotal, cartItems } });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <>
   <SEO
  title="Secure Login to Your LifeVac Account"
  description="Sign in to your LifeVac account to access your order history, shipping details, and profile settings. Your information is protected with our secure login."
  keywords="LifeVac login, sign in, secure user access, my orders, order history"
  ogTitle="Login to Your LifeVac Account"
  ogDescription="Access your LifeVac dashboard and manage your orders. Your account is protected by our secure login."
  twitterTitle="LifeVac Login | Secure Account Access"
  twitterDescription="Sign in to your account with confidence. Your LifeVac profile and order history are waiting for you."
/>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
          <Link
            to="/"
            className="flex justify-center items-center text-center text-2xl font-semibold mb-6"
          >
            <img src={logo} width={300} alt="LifeVac Logo"/>
          </Link>

          <h3 className="text-lg font-medium text-center mb-4">Log in</h3>
          <p className="text-sm text-center text-gray-500 mb-6">
            Choose how you’d like to log in
          </p>

          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-600 text-sm mb-3 font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!isEmailValid}
              className={`w-full py-3 rounded-md font-medium transition ${isEmailValid
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              Continue
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button className="w-full py-3 rounded-md font-medium transition bg-[#00083f] mt-4 text-white"
              type="button"
              onClick={guestLogin}
            >
              Guest Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            <Link to="/privacy-policy" className="underline">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
