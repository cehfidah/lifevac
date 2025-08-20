import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

// --- Helper Components ---

const IconWrapper = ({ children }) => (
  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
    {children}
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-1 text-sm text-gray-600">{children}</div>
  </div>
);

// --- Main Component ---

const libraries = ["places"];
const mapContainerStyle = {
  height: "150px",
  width: "100%",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 34.052235, // Default latitude (Los Angeles)
  lng: -118.243683, // Default longitude
};

const Success = () => {
  const { state } = useLocation();
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    // This effect attempts to convert the shipping address to coordinates for the map.
    if (isLoaded && state && state.shipping_address) {
      const { address, city, state: region, zip, country } = state.shipping_address;
      const fullAddress = `${address}, ${city}, ${region} ${zip}, ${country}`;

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          fullAddress
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK" && data.results[0]) {
            setMapCenter(data.results[0].geometry.location);
          }
        })
        .catch((error) => console.error("Geocoding error:", error));
    }
  }, [state, isLoaded]);

  // Function to trigger the browser's print dialog
  const handlePrint = () => {
    window.print();
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-10 bg-white shadow-md rounded-lg">
          <h1 className="text-xl font-semibold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">No transaction data found. Please return to the homepage.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    gateway_transaction_id,
    final_amount,
    payer,
    email,
    shipping_address,
    product_detail,
    sub_total,
    shipping_amount,
    gateway_response,
    coupon_discount_amount, // Destructure coupon_discount_amount
  } = state;

  return (
    <>
      {/* Print-specific styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-section, #print-section * {
              visibility: visible;
            }
            #print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>

      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="max-w-6xl mx-auto py-8 lg:py-16 px-4 sm:px-6 lg:px-8" id="print-section">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            
            {/* Left Column */}
            <main className="lg:w-2/3 w-full space-y-8">
              <div className="flex items-center gap-4">
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </IconWrapper>
                <div>
                  <p className="text-sm text-gray-500">Order #{gateway_transaction_id}</p>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Thank you, {payer}!
                  </h1>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {isLoaded && !loadError ? (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
                        center={mapCenter}
                        options={{ gestureHandling: "none", zoomControl: false }}
                    >
                        <Marker position={mapCenter} />
                    </GoogleMap>
                ) : (
                    <div style={mapContainerStyle} className="bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Loading map...</p>
                    </div>
                )}
                <div className="p-4 sm:p-6 bg-white">
                    <h2 className="font-semibold text-gray-800">Your order is confirmed</h2>
                    <p className="text-sm text-gray-600 mt-1">You'll receive a confirmation email with your order details soon.</p>
                </div>
              </div>

              <InfoCard title="Customer Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Shipping Address</h3>
                        <p>{shipping_address.firstName} {shipping_address.lastName}</p>
                        <p>{shipping_address.address}</p>
                        <p>{shipping_address.city}, {shipping_address.state} {shipping_address.zip}</p>
                        <p>{shipping_address.country}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Billing Address</h3>
                        <p>{shipping_address.firstName} {shipping_address.lastName}</p>
                        <p>{shipping_address.address}</p>
                        <p>{shipping_address.city}, {shipping_address.state} {shipping_address.zip}</p>
                        <p>{shipping_address.country}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Contact</h3>
                        <p>{email}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Payment Method</h3>
                        <p>PayPal - Ending in XXXX</p>
                    </div>
                </div>
              </InfoCard>
            </main>

            {/* Right Column (Order Summary) */}
            <aside className="lg:w-1/3 w-full bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-sm h-fit">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {product_detail.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="relative">
                            <img
                            src={item.image}
                            alt={item.sectionTitle}
                            className="w-16 h-16 object-contain rounded-md border bg-gray-50"
                            />
                             <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                        </div>
                        <p className="font-semibold text-gray-700 ml-4">
                          {item.sectionTitle}
                        </p>
                      </div>
                      <p className="font-medium text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-6 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <p>Subtotal</p>
                    <p>${sub_total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <p>Shipping</p>
                    <p>${shipping_amount.toFixed(2)}</p>
                  </div>
                  {coupon_discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <p>Discount</p>
                        <p>-${coupon_discount_amount.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-800 mt-2 text-base">
                    <p>Total</p>
                    <p>
                      ${final_amount.toFixed(2)}{" "}
                      <span className="text-gray-500 font-normal">{gateway_response?.currency || "USD"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
            <p className="text-sm text-gray-600">
                Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link>
            </p>
            <div className="flex items-center gap-4">
                 <button onClick={handlePrint} className="text-sm bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition">
                   Print Receipt
                 </button>
              <Link
                to="/"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Success;