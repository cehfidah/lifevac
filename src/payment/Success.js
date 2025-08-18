import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "200px",
  width: "100%",
  borderRadius: "0.5rem",
};

// Default center (will be used as a fallback)
const defaultCenter = {
  lat: 34.052235,
  lng: -118.243683,
};

const Success = () => {
  const { state } = useLocation();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [isGeocoding, setIsGeocoding] = useState(true);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (state && state.shipping_address) {
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
            const { lat, lng } = data.results[0].geometry.location;
            setMapCenter({ lat, lng });
          } else {
            console.error("Geocoding failed:", data.status);
            // Fallback to default center if geocoding fails
            setMapCenter(defaultCenter);
          }
        })
        .catch((error) => {
          console.error("Error fetching geocode:", error);
          setMapCenter(defaultCenter);
        })
        .finally(() => {
          setIsGeocoding(false);
        });
    } else {
      setIsGeocoding(false);
    }
  }, [state]);

  if (!state) {
    return (
      <div className="text-center p-10 text-red-500">
        No transaction data found.
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
    gateway_response,
  } = state;

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-200">
            {/* ... (Header section remains the same) ... */}
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Thank you for your order, {payer}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Your order has been confirmed. You'll receive a confirmation
                  email soon.
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="text-lg font-semibold text-gray-800">
                  #{gateway_transaction_id}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* ... (Order Summary section remains the same) ... */}
             <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {product_detail.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.sectionTitle}
                      className="w-16 h-16 object-contain rounded-md border"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">
                        {item.sectionTitle}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p>${state.sub_total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600 mt-2">
                <p>Shipping</p>
                <p>${state.shipping_amount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-gray-800 mt-4 text-lg">
                <p>Total</p>
                <p>
                  ${final_amount.toFixed(2)}{" "}
                  {gateway_response?.currency || "USD"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-t border-gray-200">
            {/* ... (Customer Information section remains the same) ... */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-700">
                  Shipping Address
                </h3>
                <p className="text-gray-600">
                  {shipping_address.firstName} {shipping_address.lastName}
                </p>
                <p className="text-gray-600">{shipping_address.address}</p>
                <p className="text-gray-600">
                  {shipping_address.city}, {shipping_address.state}{" "}
                  {shipping_address.zip}
                </p>
                <p className="text-gray-600">{shipping_address.country}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Contact</h3>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-t border-gray-200">
            {isGeocoding || !isLoaded ? (
              <div style={mapContainerStyle} className="flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-500">Loading map...</p>
              </div>
            ) : (
              <GoogleMap
                id="shipping-map"
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={mapCenter}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            )}
          </div>

          <div className="p-6 sm:p-8 text-center">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;