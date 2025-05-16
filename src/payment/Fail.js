import { useLocation } from "react-router-dom";

export default function Fail() {
    const { state } = useLocation();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-red-600">
            <h1 className="text-3xl font-bold mb-4">❌ Payment Failed</h1>
            <p>{state?.message || "An unexpected error occurred."}</p>
        </div>
    );
}
