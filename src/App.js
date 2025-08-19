import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import GoogleAnalytics from "./utils/GoogleAnalytics";
import Error404 from "./components/Common/Error404";
import Error500 from "./components/Common/Error500";
import Layout from "./components/layout";

import AuthProtect from "./protect/AuthProtect";
import Product from "./pages/product/Product";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import Contact from "./pages/contact/Contact";
import ContactInformation from "./pages/contact-information/ContactInformation";
import RefundPolicy from "./pages/refund-policy/RefundPolicy";
import TermsOfService from "./pages/terms-of-service/TermsOfService";
import ShippingPolicy from "./pages/shipping-policy/ShippingPolicy";
import Settings from "./pages/settings/Settings";
import Checkouts from "./pages/checkouts/Checkouts";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import OtpVerification from "./pages/auth/OtpVerification";
import DashboardLayout from "./components/dashboardlayout";
import CartModal from "./components/cart-modal/CartModal";
import Success from "./payment/Success";
import Fail from "./payment/Fail";
import OrderDetails from "./pages/orders/OrderDetails";
import EmergencyGuide from "./pages/EmergencyGuide";
import TrackOrder from "./pages/track-order/TrackOrder";
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCoupons from './pages/admin/ManageCoupons';
import AbandonedCheckouts from './pages/admin/AbandonedCheckouts'; // <-- 1. IMPORT THE NEW COMPONENT

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the location changes
  }, [location]);
  return (
    <>
      <CartModal />
      {/* <GoogleAnalytics /> Add the Google Analytics tracker */}
      <Routes>
        <Route element={<Error404 />} path={`/404`} />
        <Route element={<Error500 />} path={`/500`} />
        {/* Default fallback route */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/contact-information" element={<ContactInformation />} />
          <Route path="/product/lifevac" element={<Product />} />
                      <Route path="/track-order" element={<TrackOrder />} />

          <Route
            path="/product/home-medic-a-guide-for-household-emergencies"
            element={<EmergencyGuide />}
          />
        </Route>
   {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<ManageOrders />} />
           <Route path="users" element={<ManageUsers />} />      {/* Add this line */}
    <Route path="coupons" element={<ManageCoupons />} />  
          {/* Redirect /admin to dashboard */}
    <Route path="abandoned-checkouts" element={<AbandonedCheckouts />} />

          <Route index element={<Navigate to="/admin/dashboard" />} />
        </Route>
        <Route element={<AuthProtect />}>
          <Route path="/checkouts" element={<Checkouts />} />
          <Route element={<DashboardLayout />}>
            <Route path="/fail" element={<Fail />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />{" "}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
