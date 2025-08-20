import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';

// Google Analytics
import GoogleAnalytics from "./utils/GoogleAnalytics";

// Common Components
import Error404 from "./components/Common/Error404";
import Error500 from "./components/Common/Error500";
import Layout from "./components/layout";
import DashboardLayout from "./components/dashboardlayout";
import CartModal from "./components/cart-modal/CartModal";

// Page Components
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import EmergencyGuide from "./pages/EmergencyGuide";
import Checkouts from "./pages/checkouts/Checkouts";
import Contact from "./pages/contact/Contact";
import TrackOrder from "./pages/track-order/TrackOrder";

// Authentication & Profile
import AuthProtect from "./protect/AuthProtect";
import Login from "./pages/auth/Login";
import OtpVerification from "./pages/auth/OtpVerification";
import Profile from "./pages/profile/Profile";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import Settings from "./pages/settings/Settings";

// Payment Status
import Success from "./payment/Success";
import Fail from "./payment/Fail";

// Policy Pages
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import RefundPolicy from "./pages/refund-policy/RefundPolicy";
import TermsOfService from "./pages/terms-of-service/TermsOfService";
import ShippingPolicy from "./pages/shipping-policy/ShippingPolicy";
import ContactInformation from "./pages/contact-information/ContactInformation";

// Admin Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCoupons from './pages/admin/ManageCoupons';
import AbandonedCheckouts from './pages/admin/AbandonedCheckouts';

// Initialize Google Analytics with your Measurement ID
// It's best practice to store this ID in a .env file
ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID || "YOUR_TRACKING_ID");

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Scrolls to the top of the page on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <CartModal />
      {/* GA component that tracks pageviews on route changes */}
      <GoogleAnalytics />

      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/product/lifevac" element={<Product />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/contact-information" element={<ContactInformation />} />
          <Route
            path="/product/home-medic-a-guide-for-household-emergencies"
            element={<EmergencyGuide />}
          />
        </Route>

        {/* --- AUTHENTICATION ROUTES --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        {/* --- PROTECTED USER ROUTES --- */}
        <Route element={<AuthProtect />}>
          <Route path="/checkouts" element={<Checkouts />} />
          <Route element={<DashboardLayout />}>
            <Route path="/success" element={<Success />} />
            <Route path="/fail" element={<Fail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="coupons" element={<ManageCoupons />} />
          <Route path="abandoned-checkouts" element={<AbandonedCheckouts />} />
        </Route>

        {/* --- ERROR & FALLBACK ROUTES --- */}
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;