// Imports
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { IoBagHandleOutline } from "react-icons/io5";

import logo from "../../assest/logo.webp";

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

  const countries = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  const [country, setCountry] = useState({ label: "India", value: "IN" });
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
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.address,
      formData.city,
      formData.zip,
      formData.phone,
      country?.label,
      selectedState?.label,
    ];

    return requiredFields.every((field) => field && field.trim() !== "");
  };

  // if (!validateForm()) {
  //   toast.error("Please fill in all required shipping details before proceeding.");
  //   return;
  // }
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
    }
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
        <header className="border-b shadow-sm px-6 sm:px-12 md:px-28 py-4 md:py-8 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/">
              <img
                className="w-24 sm:w-32 md:w-auto lg:w-[30%]"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>

          <div>
            <IoBagHandleOutline size={25} />
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-4 md:p-8 grid md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">Account</div>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value="brijp6386@gmail.com"
                readOnly
              />
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked readOnly />
                <span>Send me live tracking and order updates</span>
              </label>
            </div>

            {/* Delivery */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Delivery</h2>
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
                <input
                  className="w-full border p-2 rounded"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Apartment, suite, etc (optional)"
                value={formData.apt}
                onChange={(e) => handleChange("apt", e.target.value)}
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                <Select
                  className="w-full"
                  options={states}
                  value={selectedState}
                  onChange={setSelectedState}
                  placeholder="State"
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="ZIP code"
                  value={formData.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                />
              </div>
              <div className="mb-4">
                <p className="text-sm mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <span className="border px-2 py-1 rounded bg-gray-100">
                    +{phoneCode}
                  </span>
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4  mx-auto">
              <h2 className="text-lg font-semibold">Secure Checkout</h2>
              <p className="text-sm text-gray-600">
                All transactions are secure and encrypted. Your order includes
                free returns and 24/7 access to our award-winning customer
                service
              </p>

              <Paypal
                handleApprove={handleApprove}
                amount={subtotal + shippingCost}
              />
            </div>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="">
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>

        {/* Policy Links */}
        <footer className="mt-6 text-center py-6 text-sm text-gray-600 border-t">
          <div className="flex justify-center gap-4">
            <Link to="/refund-policy" className="hover:underline">
              Refund policy
            </Link>
            <Link to="/shipping-policy" className="hover:underline">
              Shipping policy
            </Link>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy policy
            </Link>
            <Link to="/terms-of-service" className="hover:underline">
              Terms of service
            </Link>
            <Link to="/contact-information" className="hover:underline">
              Contact information
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Checkouts;

const OrderSummary = ({ cartItems }) => {
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

  return (
    <div className="bg-gray-100 rounded-md border border-gray-200 p-6 text-sm font-sans space-y-4">
      <div className="space-y-5">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex space-x-3">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.sectionTitle}
                  className="h-14 w-14 rounded-md object-cover"
                />
                <span className="absolute -top-2 -left-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
                  {item.quantity}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.sectionTitle}
                </p>
                <div className="text-xs text-gray-600 leading-tight">
                  {item.title}
                  {item.kits && <div>{item.kits}</div>}
                </div>
                {item.savings && (
                  <p className="text-xs text-gray-500">
                    {item.title} (−₹
                    {(item.originalPrice - item.price).toFixed(2)})
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="line-through text-gray-400 text-xs">
                ₹{item.originalPrice.toFixed(2)}
              </p>
              <p className="font-medium text-sm">
                {item.price === 0 ? "FREE" : `₹${item.price.toFixed(2)}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Discount Code Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Discount code"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-sm"
        />
        <button className="px-4 py-2 bg-gray-200 rounded-md font-medium text-sm">
          Apply
        </button>
      </div>

      {/* Price Summary */}
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-700">
            Subtotal · {cartItems.reduce((s, i) => s + i.quantity, 0)} items
          </span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Shipping</span>
          <span>₹{shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2">
          <span>Total</span>
          <span>INR ₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Savings */}
      <div className="flex items-center space-x-2 text-green-600 font-semibold text-sm pt-1">
        <FaTag className="w-4 h-4" />
        <span>TOTAL SAVINGS ₹{totalSavings.toFixed(2)}</span>
      </div>
    </div>
  );
};
