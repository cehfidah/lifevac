import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import GoogleAnalytics from "./utils/GoogleAnalytics";
import Error404 from "./components/Common/Error404";
import Error500 from "./components/Common/Error500";
import Layout from "./components/layout";

import AuthProtect from "./protect/AuthProtect";
import Home from "./pages/home/Home";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import Contact from "./pages/contact/Contact";
import ContactInformation from "./pages/contact-information/ContactInformation";
import RefundPolicy from "./pages/refund-policy/RefundPolicy";
import TermsOfService from "./pages/terms-of-service/TermsOfService";
import ShippingPolicy from "./pages/shipping-policy/ShippingPolicy";
import Settings from "./pages/settings/Settings";
import Checkouts from "./pages/checkouts/Checkouts";
import Collections from "./pages/collections/Collections";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import OtpVerification from "./pages/auth/OtpVerification";
import DashboardLayout from "./components/dashboardlayout";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the location changes
  }, [location]);
  return (
    <>
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
          <Route path="/settings" element={<Settings />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/contact-information" element={<ContactInformation />} />
          <Route path="/collections" element={<Collections />} />
        </Route>

        <Route element={<AuthProtect />}>
          <Route element={<DashboardLayout />}>
            <Route path="/checkouts" element={<Checkouts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
