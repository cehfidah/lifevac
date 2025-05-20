// Imports
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import { FaTag } from "react-icons/fa";

// Utils & Components
import SEO from "../../utils/SEO";
import { ApiHandler } from "../../helper/ApiHandler";
import Loading from "../../components/Common/Loading";
import Paypal from "../../payment/Paypal";
import { clearCart } from "../../store/slice/cartSlice";

import Container from "../../components/Container";
import CheckOutHead from "./CheckOutHead";
import CheckOutFooter from "./CheckOutFooter";
import OrderSummary from "./OrderSummary";

const shippingCost = 500;

const Checkouts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const subtotal = location.state?.subtotal || 0;
  const cartItems = location.state?.cartItems || [];

  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [phoneCode, setPhoneCode] = useState("91");
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const inputRefs = useRef({});

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
    });
  };

  useEffect(() => {
    if (country?.value) {
      const stateList = State.getStatesOfCountry(country.value);
      setStates(stateList.map((s) => ({ label: s.name, value: s.isoCode })));
      const code = Country.getCountryByCode(country.value)?.phonecode;
      setPhoneCode(code || "91");
    }
  }, [country]);

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

  const handleApprove = async (data, actions) => {
    const subtotal = cartItems.reduce((sum, item) => {
      if (item.type === "guide") {
        return sum + Number(item.extraPrice || 0);
      }
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);
    const total = subtotal + shippingCost;
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
        shipping_amount: shippingCost,
        final_amount: total,
        total_saving: totalSavings,
        product_detail: cartItems,
        shipping_address: finalData,
        gateway_response: details,
        payment_status: details.status,
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
        shipping_amount: shippingCost,
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
      <div className="min-h-screen bg-white text-black">
        <CheckOutHead />
        <Container>
          <div className="paddingX py-4 md:py-8 grid md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-6">
              <form onSubmit={checkInput}>
                {/* Delivery */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                  {/* Dropdown */}
                  {addresses.length > 0 && (
                    <select
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={selectedAddressId}
                      onChange={handleAddressChange}
                    >
                      {addresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.first_name} {addr.last_name} - {addr.address}
                        </option>
                      ))}
                    </select>
                  )}

                  <div className="mb-4">
                    <p className="text-sm mb-1">Country/Region</p>
                    <Select
                      options={countries}
                      value={country}
                      onChange={setCountry}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        ref={(el) => (inputRefs.current.firstName = el)}
                        className={`w-full border p-2 rounded ${formErrors.firstName ? "border-red-500" : ""}`}
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                      />
                      {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        ref={(el) => (inputRefs.current.lastName = el)}
                        className={`w-full border p-2 rounded ${formErrors.lastName ? "border-red-500" : ""}`}
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                      />
                      {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <input
                      ref={(el) => (inputRefs.current.address = el)}
                      className={`w-full border p-2 rounded ${formErrors.address ? "border-red-500" : ""}`}
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                    {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                  </div>
                  <div>
                    <input
                      className="w-full border p-2 mb-2 rounded"
                      placeholder="Apartment, suite, etc (optional)"
                      value={formData.apt}
                      onChange={(e) => handleChange("apt", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <input
                        ref={(el) => (inputRefs.current.city = el)}
                        className={`w-full border p-2 rounded ${formErrors.city ? "border-red-500" : ""}`}
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                      {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                    </div>
                    <Select
                      className="w-full"
                      options={states}
                      value={selectedState}
                      onChange={setSelectedState}
                      placeholder="State"
                    />
                    <div>
                      <input
                        ref={(el) => (inputRefs.current.zip = el)}
                        className={`w-full border p-2 rounded ${formErrors.zip ? "border-red-500" : ""}`}
                        placeholder="ZIP code"
                        value={formData.zip}
                        onChange={(e) => handleChange("zip", e.target.value)}
                      />
                      {formErrors.zip && <p className="text-red-500 text-sm">{formErrors.zip}</p>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm mb-1">Phone</p>
                    <div className="flex items-center gap-2">
                      <span className="border px-2 py-1 rounded bg-gray-100">
                        +{phoneCode}
                      </span>
                      <input
                        ref={(el) => (inputRefs.current.phone = el)}
                        className={`w-full border p-2 rounded ${formErrors.phone ? "border-red-500" : ""}`}
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-2 mx-auto mt-4">
                  <h2 className="text-lg font-semibold">Secure Checkout</h2>
                  <p className="text-sm text-[#162950]">
                    All transactions are secure and encrypted. Your order includes
                    free returns and 24/7 access to our award-winning customer
                    service
                  </p>

                  <button
                    type="submit"
                    className="flex justify-center items-center w-full bg-[#162950] text-white text-base font-bold rounded-xl py-4"
                  >
                    Complete Purchase
                  </button>

                </div>
              </form>

            </div>
            <div className="md:sticky md:top-6 md:self-start w-full">
              <OrderSummary cartItems={cartItems} shippingCost={shippingCost} />
            </div>
          </div>
        </Container>

        <CheckOutFooter />
      </div>

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
              <span className="text-green-600">${(subtotal + shippingCost).toFixed(2)}</span>
            </p>

            <Paypal
              handleApprove={handleApprove}
              amount={subtotal + shippingCost}
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


