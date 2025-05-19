import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../utils/SEO";
import { toast } from "react-toastify";
import Loading from "../../components/Common/Loading";
import { ApiHandler } from "../../helper/ApiHandler";
import { useDispatch } from "react-redux";
import logo from "../../assest/logo.webp";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  if (loading) return <Loading />;

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
          <Link
            to="/"
            className="flex justify-center items-center text-center text-2xl font-semibold mb-6"
          >
            <img src={logo} width={300} />
          </Link>

          <h3 className="text-lg font-medium text-center mb-4">Log in</h3>
          <p className="text-sm text-center text-gray-500 mb-6">
            Choose how you’d like to log in
          </p>

          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition mb-4 font-medium"
          >
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

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-600 text-sm mb-3 font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!isEmailValid}
              className={`w-full py-3 rounded-md font-medium transition ${
                isEmailValid
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
            <button className="w-full py-3 rounded-md font-medium transition bg-[#00083f] mt-4 text-white">
              Gust
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
