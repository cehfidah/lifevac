import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); // 'success' or 'fail'
  const name = queryParams.get("name") || "User";
  const transactionId = queryParams.get("transactionId") || "N/A";
  const amount = queryParams.get("amount") || "0.00";

  const isSuccess = status === "success";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border-t-8 ${
          isSuccess ? "border-green-500" : "border-red-500"
        }`}
      >
        <div className="text-center">
          <div className="text-5xl mb-4">{isSuccess ? "🎉" : "❌"}</div>
          <h1
            className={`text-2xl font-bold mb-2 ${
              isSuccess ? "text-green-700" : "text-red-700"
            }`}
          >
            {isSuccess ? "Payment Successful!" : "Payment Failed!"}
          </h1>
          <p className="text-gray-700 mb-4">
            {isSuccess ? "Thank you" : "Sorry"},{" "}
            <span className="font-semibold">{name}</span>
          </p>

          <div className="text-left text-sm text-gray-600 space-y-2 border-t pt-4">
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {transactionId}
            </p>
            <p>
              <span className="font-medium">Amount:</span> {amount} USD
            </p>
            <p
              className={`${
                isSuccess ? "text-green-600" : "text-red-600"
              } font-medium`}
            >
              {isSuccess
                ? "Transaction recorded successfully."
                : "There was an issue processing your transaction."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
