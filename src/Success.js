import { useLocation } from "react-router-dom";

export default function Success() {
    const { state } = useLocation();

    if (!state) {
        return <div className="text-center mt-10">No payment data found.</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
            <h1 className="text-xl font-bold mb-4 text-green-600">Payment Successful!</h1>
            <p><strong>Payer:</strong> {state.payer}</p>
            <p><strong>Email:</strong> {state.email}</p>
            <p><strong>Amount:</strong> {state.amount} {state.currency}</p>
            <p><strong>Status:</strong> {state.status}</p>
            <p><strong>Transaction ID:</strong> {state.id}</p>
        </div>
    );
}
