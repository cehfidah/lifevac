// Imports
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";

// Utils & Components
import SEO from "../../utils/SEO";
import { ApiHandler } from "../../helper/ApiHandler";
import Loading from "../../components/Common/Loading";
import Paypal from "../../payment/Paypal";
import { clearCart } from "../../store/slice/cartSlice";

import CheckOutHead from "./CheckOutHead";
import CheckOutFooter from "./CheckOutFooter";
import ShippingForm from "./ShippingForm";

const shippingOptions = [
  {
    id: "normal",
    label: "Standard Shipping (5–7 business days)",
    description: "Tracking number provided",
    price: 500,
  },
  {
    id: "fast",
    label: "Fast Shipping (2–3 business days)",
    description: "Tracking number provided",
    price: 600,
  },
  {
    id: "express",
    label: "Express Shipping (1 business day)",
    description: "Tracking number provided",
    price: 1000,
  },
];

const Checkouts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const subtotal = location.state?.subtotal || 0;
  const cartItems = location.state?.cartItems || [];
  const inputRefs = useRef({});

  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [phoneCode, setPhoneCode] = useState("91");
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("normal");

  const selectedOption = shippingOptions.find((opt) => opt.id === selected);

  const countries = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  const [country, setCountry] = useState({ label: "United States", value: "US" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty. Redirecting to home.");
      navigate("/", { replace: true });
    }
  }, [cartItems, navigate]);

  // Fetch addresses from API
  useEffect(() => {
    fetchData();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const fetchData = async () => {
    try {
      const getAddress = await ApiHandler(
        "/get_address.php",
        "POST",
        undefined,
        token,
        dispatch,
        navigate
      );
      if (getAddress.data.status === "1" && getAddress.data.data.length > 0) {
        setAddresses(getAddress.data.data);
        const defaultAddress =
          getAddress.data.data.find((a) => a.is_default_address === "1") ||
          getAddress.data.data[0];
        setSelectedAddressId(defaultAddress.id);
        setFormDataFromAddress(defaultAddress);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setFormDataFromAddress = (addr) => {
    const selectedCountry = Country.getAllCountries().find(
      (c) =>
        c.name === addr.country ||
        c.phonecode === addr.country_code ||
        c.isoCode === addr.country_code
    );

    const selectedCountryIso = selectedCountry?.isoCode || "IN";
    const selectedCountryLabel = selectedCountry?.name || "India";
    const phonecode = selectedCountry?.phonecode || "91";

    const stateList = State.getStatesOfCountry(selectedCountryIso);
    const matchedState = stateList.find((s) => s.name === addr.state);

    setCountry({ label: selectedCountryLabel, value: selectedCountryIso });
    setPhoneCode(phonecode);
    setStates(stateList.map((s) => ({ label: s.name, value: s.isoCode })));
    setSelectedState(
      matchedState
        ? { label: matchedState.name, value: matchedState.isoCode }
        : null
    );

    setFormData({
      firstName: addr.first_name || "",
      lastName: addr.last_name || "",
      address: addr.address || "",
      apt: addr.apartment || "",
      city: addr.city || "",
      zip: addr.zip_code || "",
      phone: addr.phone || "",
      email: user?.email || "",
    });
  };

  useEffect(() => {
    if (country?.value) {
      const stateList = State.getStatesOfCountry(country.value);
      setStates(stateList.map((s) => ({ label: s.name, value: s.isoCode })));
      const code = Country.getCountryByCode(country.value)?.phonecode;
      setPhoneCode(code || "91");
    }
  }, [country, user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleAddressChange = (e) => {
    const selectedId = e.target.value;
    setSelectedAddressId(selectedId);
    const addr = addresses.find((a) => a.id === selectedId);
    if (addr) {
      setFormDataFromAddress(addr);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.zip.trim()) errors.zip = "ZIP code is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!country?.label) errors.country = "Country is required";
    if (!selectedState?.label) errors.state = "State is required";
    return errors;
  };

  const scrollToFirstError = (errors) => {
    const firstErrorKey = Object.keys(errors)[0];
    const ref = inputRefs.current[firstErrorKey];
    if (ref && ref.scrollIntoView) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const checkInput = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      scrollToFirstError(errors);
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      setCouponSuccess("");
      return;
    }

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const response = await ApiHandler(
        "/coupon_is_vaild.php",
        "POST",
        { code: couponCode },
        token,
        dispatch,
        navigate
      );

      if (response.data.status === "1") {
        const discount = Number(response.data.data.discount || 0);
        setDiscountPercent(discount);

        // Calculate based on subtotal + shipping
        const baseAmount = subtotal + selectedOption.price;
        const discountAmt = (baseAmount * discount) / 100;

        setDiscountAmount(discountAmt);

        setCouponSuccess(`Coupon applied! You saved ₹${discountAmt.toFixed(2)} (${discount}%)`);
      } else {
        setCouponError(response.data.msg || "Invalid coupon code.");
        setDiscountAmount(0);
        setDiscountPercent(0);
      }
    } catch (err) {
      setCouponError("Something went wrong. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleApprove = async (data, actions) => {
    const subtotal = cartItems.reduce((sum, item) => {
      if (item.type === "guide") {
        return sum + Number(item.extraPrice || 0);
      }
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    const baseAmount = subtotal + selectedOption.price;
    const discountAmt = discountPercent > 0 ? (baseAmount * discountPercent) / 100 : 0;
    const total = baseAmount - discountAmt;

    const totalSavings = cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price || 0),
      0
    );
    const itemQuantity = cartItems.reduce((s, i) => s + i.quantity, 0);

    const finalData = {
      ...formData,
      country: country?.label || "",
      state: selectedState?.label || "",
      phoneCode: phoneCode,
    };

    try {
      const details = await actions.order.capture();
      const payload = {
        gateway_transaction_id: details.id,
        item_quantity: itemQuantity,
        sub_total: subtotal,
        shipping_amount: selectedOption.price,
        final_amount: total,
        total_saving: totalSavings,
        product_detail: cartItems,
        shipping_address: finalData,
        gateway_response: details,
        payment_status: details.status,
        coupon_code: couponCode,
        coupon_discount_amount: discountAmount,
        user_email: formData.email
      };
      try {
        const response = await ApiHandler(
          "/transaction_create.php",
          "POST",
          payload,
          token,
          dispatch,
          navigate
        );
        if (response.data.status === "1") {
          toast.success(response.data.msg);

          const paymentResponse = {
            ...payload,
            payer: details.payer.name.given_name,
            email: details.payer.email_address,
          };

          if (response.data.data === "1" || response.data.data === 1) {
            navigate("/success", { state: paymentResponse });
          } else {
            navigate("/fail", { state: paymentResponse });
          }
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Payment failed", err);

      const failedResponse = {
        gateway_transaction_id: null,
        item_quantity: itemQuantity,
        sub_total: subtotal,
        shipping_amount: selectedOption.price,
        final_amount: total,
        total_saving: totalSavings,
        product_detail: cartItems,
        shipping_address: finalData,
        gateway_response: null,
        payment_status: "FAILED",
        payer: null,
        email: null,
      };

      navigate("/fail", {
        state: { state: failedResponse },
      });
    } finally {
      setLoading(false);
      dispatch(clearCart());
      closeModal();
    }

    closeModal();
  };

  const baseAmount = subtotal + selectedOption.price;
  const discountAmt = discountPercent > 0 ? (baseAmount * discountPercent) / 100 : 0;
  const finalAmount = baseAmount - discountAmt;

  if (loading) return <Loading />;
  return (
    <>
      <SEO
        title="Secure Checkout - AirwayClear"
        description="Complete your purchase with AirwayClear's secure checkout process. Fast, reliable, and protected."
        keywords="AirwayClear checkout, secure payment, purchase"
        ogTitle="AirwayClear Checkout"
        ogDescription="Finalize your AirwayClear purchase securely."
        twitterTitle="Checkout - AirwayClear"
        twitterDescription="Securely pay for your AirwayClear order."
      />

      <CheckOutHead />
      <ShippingForm
        onSubmitForm={checkInput}
        inputRefs={inputRefs}
        formErrors={formErrors}
        formData={formData}
        onChnage={handleChange}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        handleAddressChange={handleAddressChange}
        countries={countries}
        country={country}
        setCountry={setCountry}
        states={states}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        phoneCode={phoneCode}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        selectedOption={selectedOption}
        shippingOptions={shippingOptions}
        selected={selected}
        setSelected={setSelected}
        cartItems={cartItems}
        shippingCost={selectedOption.price}
        discountAmount={discountAmount}
        discountPercent={discountPercent}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        handleApplyCoupon={handleApplyCoupon}
        couponLoading={couponLoading}
        couponError={couponError}
        couponSuccess={couponSuccess}
      />

      <CheckOutFooter />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Top Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center mb-2">
              Pay with PayPal
            </h2>

            {/* Amount Display */}
            <p className="text-center text-2xl font-bold text-gray-800 mb-6">
              Amount:{" "}
              <span className="text-green-600">${(finalAmount).toFixed(2)}</span>
            </p>

            <Paypal
              handleApprove={handleApprove}
              amount={finalAmount}
            />

            <p className="text-sm text-gray-500 text-center mt-4 italic leading-relaxed">
              Secure payments processed through{" "}
              <span className="text-blue-600 font-semibold">PayPal</span>. You
              can pay using your PayPal account or any major debit/credit card —
              no account required.
            </p>

            <button
              onClick={closeModal}
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkouts;


