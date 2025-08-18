import React, { useState } from "react";
import axios from "axios";
import first from "../../assest/image/payment1.svg";
import second from "../../assest/image/payment2.svg";
import third from "../../assest/image/payment3.svg";
import four from "../../assest/image/payment4.svg";
import five from "../../assest/image/payment5.svg";
import six from "../../assest/image/payment6.svg";
import seven from "../../assest/image/payment7.svg";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // ✅ Get current route
  const isGuidePage =
    location.pathname === "/product/home-medic-a-guide-for-household-emergencies";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      // Replace this URL with your actual subscription API endpoint
      const res = await axios.post("/api/subscribe", { email });
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className={`bg-[#0e2243] text-white pt-10 px-4 ${isGuidePage ? "pb-40" : ""
        }`}
    >
      <div className="max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-black mb-4">Subscribe to our emails</h2>
        <p className="text-base mb-6 text-gray-300">
          Enter your email to stay up to date with with our newsletter!
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col justify-center gap-3 mb-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="px-4 py-2 border bg-transparent rounded-md w-full text-black focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black font-bold text-base px-6 py-4 rounded-md hover:bg-gray-200 transition"
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {message && <p className="text-green-300 text-sm mt-1">{message}</p>}
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-10 py-6 text-center">
        <div className="flex justify-center flex-wrap gap-5 mb-4">
          <img src={first} />
          <img src={second} />
          <img src={third} />
          <img src={four} />
          <img src={five} />
          <img src={six} />
          <img src={seven} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="text-sm text-gray-300">
            © 2025 All Rights Reserved
          </div>
          <div>
            <Link to="/refund-policy" className="hover:underline">
              &nbsp; • &nbsp; Refund policy
            </Link>
            <Link to="/privacy-policy" className="hover:underline">
              &nbsp; • &nbsp; Privacy policy
            </Link>
            <Link to="/terms-of-service" className="hover:underline">
              &nbsp; • &nbsp; Terms of service
            </Link>
            <Link to="/shipping-policy" className="hover:underline">
              &nbsp; • &nbsp; Shipping policy
            </Link>
            <Link to="/contact-information" className="hover:underline">
              &nbsp; • &nbsp; Contact information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
