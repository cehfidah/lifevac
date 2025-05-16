import { useLocation } from "react-router-dom";

export default function Fail() {
    const { state } = useLocation();

    return (
        <>
            <div className="flex items-center justify-center bg-gray-100" style={{ minHeight: "calc(100vh - 155.5px)" }}>
                <div
                    className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border-t-8 border-red-500`}
                >
                    <div className="text-center">
                        <div className="text-5xl mb-4">❌</div>
                        <h1
                            className={`text-2xl font-bold mb-2 text-red-700`}
                        >
                            Payment Failed!
                        </h1>
                        <p className="text-gray-700 mb-4">
                            Sorry,{" "}
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
                                className={`text-red-600 font-medium`}
                            >
                                There was an issue processing your transaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
