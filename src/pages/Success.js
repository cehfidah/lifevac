import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); // 'success' or 'fail'
  const name = queryParams.get("name") || "User";
  const transactionId = queryParams.get("transactionId") || "N/A";
  const amount = queryParams.get("amount") || "0.00";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        {status === "success" ? (
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">
              🎉 Payment Successful!
            </h1>
            <p className="text-lg text-gray-700">
              Thank you, <span className="font-semibold">{name}</span>
            </p>
            <p className="mt-2">
              Transaction ID: <span className="font-bold">{transactionId}</span>
            </p>
            <p>
              Amount: <span className="font-semibold">{amount} USD</span>
            </p>
            <p className="mt-2 text-green-600">
              Transaction recorded successfully.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-red-700 mb-2">
              ❌ Payment Failed!
            </h1>
            <p className="text-lg text-gray-700">
              Sorry, <span className="font-semibold">{name}</span>
            </p>
            <p className="mt-2">
              Transaction ID: <span className="font-bold">{transactionId}</span>
            </p>
            <p>
              Amount: <span className="font-semibold">{amount} USD</span>
            </p>
            <p className="mt-2 text-red-600">
              There was an issue processing your transaction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
