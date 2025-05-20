import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";

const PayWithPayPalModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Main Button to Open Modal */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Open PayPal Modal
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              Pay with PayPal
            </h2>

            {/* PayPal Button */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-blue-900 font-semibold py-2 rounded-lg flex justify-center items-center space-x-1 mb-3">
              <FaPaypal />
              <span className="italic font-bold">Pay</span>
              <span className="italic font-bold text-blue-600">Pal</span>
            </button>

            {/* Debit or Credit Card Button */}
            <button className="w-full bg-gray-800 hover:bg-gray-700 transition text-white font-semibold py-2 rounded-lg flex justify-center items-center space-x-2">
              <FaCreditCard className="text-white" />
              <span>Debit or Credit Card</span>
            </button>

            {/* Footer */}
            <p className="text-sm text-gray-500 text-center mt-4 italic leading-relaxed">
              Secure payments processed through{" "}
              <span className="text-blue-600 font-semibold">PayPal</span>. You
              can pay using your PayPal account or any major debit/credit card —
              no account required.
            </p>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayWithPayPalModal;
