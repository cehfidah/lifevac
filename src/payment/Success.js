import { useLocation } from "react-router-dom";

export default function Success() {
    const { state } = useLocation();

    if (!state) return <div className="text-center p-10 text-red-500">No transaction data found.</div>;

    return (
        <div className="flex flex-col items-center justify-center h-screen text-green-700">
            <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
            <p className="mb-2">Thank you, <strong>{state.payer}</strong></p>
            <p>Transaction ID: <strong>{state.id}</strong></p>
            <p>Amount: <strong>{state.amount} {state.currency}</strong></p>
            <p className="mt-2">{state.backendMessage || "Transaction recorded successfully."}</p>
        </div>
    );
}
