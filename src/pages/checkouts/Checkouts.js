import React, { useState } from "react";
import SEO from "../../utils/SEO";
import first from "../../assest/Airwayclear_64x64.svg";
import second from "../../assest/Yourparagraphtext_64x64.svg";

const Checkouts = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [billingOption, setBillingOption] = useState("same");
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true); // ✅ Added

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
        <div className="max-w-7xl mx-auto p-4 md:p-8 grid md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-4">AirwayClear</h1>
              <div className="flex items-center space-x-4 mb-6">
                <button className="bg-[#5a31f4] hover:bg-[#4e2bd1] text-white font-semibold py-3 px-6 rounded w-full">
                  Shop{" "}
                  <span className="bg-white rounded-sm px-2 text-blue-400">
                    Pay
                  </span>
                </button>
                <button className="bg-black text-white font-semibold py-3 px-6 rounded w-full">
                  G Pay
                </button>
              </div>
              <div className="text-center text-gray-400 text-sm mb-6">OR</div>
            </div>

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
              <select className="w-full border border-gray-300 rounded px-4 py-2">
                <option>India</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <select className="border border-gray-300 rounded px-4 py-2">
                  <option>Gujarat</option>
                </select>
                <input
                  type="text"
                  placeholder="PIN code"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <input
                type="text"
                placeholder="Phone"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" />
                <span>Text me with news and offers</span>
              </label>
            </div>

            {/* Payment Section */}
            <div className="space-y-4  mx-auto">
              <h2 className="text-lg font-semibold">Secure Checkout</h2>
              <p className="text-sm text-gray-600">
                All transactions are secure and encrypted. Your order includes
                free returns and 24/7 access to our award-winning customer
                service
              </p>

              {/* Payment Methods */}
              <div className="border border-gray-300 rounded-lg">
                {/* Credit Card Option */}
                <label
                  className={`flex items-center p-4 space-x-3 cursor-pointer border-b ${
                    paymentMethod === "credit" ? "bg-gray-50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={() => setPaymentMethod("credit")}
                    className="accent-blue-600"
                  />
                  <span className="font-semibold text-sm">Credit card</span>
                  <div className="ml-auto flex items-center space-x-1">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      className="h-5"
                    />
                    <img
                      src="https://img.icons8.com/color/48/000000/mastercard.png"
                      className="h-5"
                    />
                    <img
                      src="https://img.icons8.com/color/48/000000/amex.png"
                      className="h-5"
                    />
                    <img
                      src="https://img.icons8.com/color/48/000000/discover.png"
                      className="h-5"
                    />
                  </div>
                </label>

                {/* Credit Card Fields */}
                {paymentMethod === "credit" && (
                  <div className="space-y-3 px-4 pb-4">
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Expiration date (MM / YY)"
                        className="border border-gray-300 rounded px-4 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Security code"
                        className="border border-gray-300 rounded px-4 py-2"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on card"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={useShippingAsBilling}
                        onChange={() =>
                          setUseShippingAsBilling(!useShippingAsBilling)
                        } // ✅ Added handler
                        className="accent-blue-600"
                      />
                      <span>Use shipping address as billing address</span>
                    </label>

                    {/* Credit Card Billing Address (conditionally shown) */}
                    {!useShippingAsBilling && (
                      <div className="space-y-3 pt-2">
                        <select className="w-full border border-gray-300 rounded px-4 py-2 text-sm">
                          <option>India</option>
                        </select>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="First name"
                            className="border border-gray-300 rounded px-4 py-2 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Last name"
                            className="border border-gray-300 rounded px-4 py-2 text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Address"
                          className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Apartment, suite, etc. (optional)"
                          className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            className="border border-gray-300 rounded px-4 py-2 text-sm"
                          />
                          <select className="border border-gray-300 rounded px-4 py-2 text-sm">
                            <option>Gujarat</option>
                          </select>
                          <input
                            type="text"
                            placeholder="PIN code"
                            className="border border-gray-300 rounded px-4 py-2 text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Phone (optional)"
                          className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Shop Pay Option */}
                <label
                  className={`flex items-center p-4 space-x-3 cursor-pointer ${
                    paymentMethod === "shoppay"
                      ? "bg-indigo-50 border-l-4 border-indigo-600"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="shoppay"
                    checked={paymentMethod === "shoppay"}
                    onChange={() => setPaymentMethod("shoppay")}
                    className="accent-[#5a31f4]"
                  />
                  <div className="flex items-center space-x-1">
                    <span className="bg-[#5a31f4] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      Shop
                    </span>
                    <span className="text-sm text-[#5a31f4]">Pay</span>
                  </div>
                  <span className="ml-2 text-sm">
                    Pay in full or in installments
                  </span>
                </label>
              </div>

              {/* Billing for Shop Pay */}
              {paymentMethod === "shoppay" && (
                <div className="space-y-3 border border-gray-300 rounded-lg p-4">
                  <h3 className="text-base font-semibold">Billing address</h3>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <label
                      className={`flex items-center p-3 cursor-pointer ${
                        billingOption === "same"
                          ? "bg-gray-50 border-l-4 border-blue-600"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="billing"
                        checked={billingOption === "same"}
                        onChange={() => setBillingOption("same")}
                        className="mr-3 accent-blue-600"
                      />
                      Same as shipping address
                    </label>
                    <label
                      className={`flex items-center p-3 cursor-pointer ${
                        billingOption === "different"
                          ? "bg-indigo-50 border-l-4 border-blue-600"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="billing"
                        checked={billingOption === "different"}
                        onChange={() => setBillingOption("different")}
                        className="mr-3 accent-blue-600"
                      />
                      Use a different billing address
                    </label>
                  </div>

                  {billingOption === "different" && (
                    <div className="space-y-3 pt-2">
                      <select className="w-full border border-gray-300 rounded px-4 py-2 text-sm">
                        <option>India</option>
                      </select>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="First name"
                          className="border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Last name"
                          className="border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                        className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          className="border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                        <select className="border border-gray-300 rounded px-4 py-2 text-sm">
                          <option>Andaman and Nicobar Islands</option>
                          <option>Delhi</option>
                          <option>Maharashtra</option>
                        </select>
                        <input
                          type="text"
                          placeholder="PIN code"
                          className="border border-gray-300 rounded px-4 py-2 text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Phone (optional)"
                        className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                      />
                    </div>
                  )}
                </div>
              )}

              <button className="w-full bg-[#1a1a2e] text-white font-semibold py-3 rounded mt-4">
                Complete Purchase
              </button>
            </div>

            {/* Policy Links */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              <a href="#" className="hover:underline">
                Refund policy
              </a>
              <a href="#" className="hover:underline">
                Shipping policy
              </a>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
              <a href="#" className="hover:underline">
                Terms of service
              </a>
              <a href="#" className="hover:underline">
                Contact information
              </a>
            </div>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="bg-gray-100 rounded p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={first}
                      alt="Product"
                      className="h-16 w-16 rounded object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">
                      1
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Guide For Household Emergencies
                    </p>
                    <p className="text-xs text-gray-500">
                      BUY 2 GET 1 FREE (−₹1,200.00)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm line-through text-gray-400">
                    ₹1,200.00
                  </p>
                  <p className="text-sm font-semibold text-green-600">FREE</p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={second}
                      alt="Product"
                      className="h-16 w-16 rounded object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">
                      3
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      AirwayClear™–Antichoking Device
                    </p>
                    <p className="text-xs text-gray-500">
                      Buy One
                      <br />
                      BUY 2 GET 1 FREE (−₹8,950.73)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm line-through text-gray-400">
                    ₹15,900.00
                  </p>
                  <p className="text-sm font-semibold">₹6,949.27</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Discount code"
                className="flex-1 border border-gray-300 rounded px-4 py-2"
              />
              <button className="px-4 py-2 bg-gray-300 rounded font-medium">
                Apply
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal · 4 items</span>
                <span>₹6,949.27</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-400">Enter shipping address</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>INR ₹6,949.27</span>
              </div>
              <div className="text-green-600 font-semibold text-sm flex items-center space-x-1">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                </svg>
                <span>TOTAL SAVINGS ₹10,150.73</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkouts;
