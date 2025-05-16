import { useLocation } from "react-router-dom";

export default function Success() {
    const { state } = useLocation();

    if (!state) return <div className="text-center p-10 text-red-500">No transaction data found.</div>;

    return (
        <>
            <div className="flex items-center justify-center bg-gray-100" style={{ minHeight: "calc(100vh - 155.5px)" }}>
                <div
                    className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border-t-8 border-green-500`}
                >
                    <div className="text-center">
                        <div className="text-5xl mb-4">🎉</div>
                        <h1
                            className={`text-2xl font-bold mb-2 text-green-700`}
                        >
                            Payment Successful!
                        </h1>
                        <p className="text-gray-700 mb-4">
                            Thank you,{" "}
                            <span className="font-semibold">{state?.payer}</span>
                        </p>

                        <div className="text-left text-sm text-gray-600 space-y-2 border-t pt-4">
                            <p>
                                <span className="font-medium">Transaction ID:</span>{" "}
                                {state?.gateway_transaction_id}
                            </p>
                            <p>
                                <span className="font-medium">Amount:</span> {state?.final_amount} {state?.gateway_response?.currency}
                            </p>
                            <p
                                className={`text-green-600 font-medium`}
                            >
                                Transaction recorded successfully.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
