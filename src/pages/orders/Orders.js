import { useEffect, useState } from "react";
import Container from '../../components/Container';
import SEO from '../../utils/SEO';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApiHandler } from "../../helper/ApiHandler";
import { toast } from "react-toastify";
import Loading from "../../components/Common/Loading";
import { FaTag } from "react-icons/fa";


const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ApiHandler("/get_transaction.php", "POST", undefined, token, dispatch, navigate);
            if (response.data.status === "1" && response.data.data.length > 0) {
                setOrders(response.data.data);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <SEO
                title="Your Orders - AirwayClear"
                description="View your past orders, delivery statuses, and order history with AirwayClear."
                keywords="AirwayClear orders, order history, purchase status"
                ogTitle="Order History - AirwayClear"
                ogDescription="Track your orders and view order details."
                twitterTitle="Orders - AirwayClear"
                twitterDescription="Manage your AirwayClear order history."
            />

            <Container>
                <div className="bg-gray-100 paddingX py-10">
                    <h1 className="text-2xl font-semibold mb-6">Orders</h1>

                    {/* Skeleton Loader */}
                    {loading && (
                        <div className="bg-white rounded-lg p-6 shadow-md animate-pulse w-full max-w-3xl mx-auto">
                            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        </div>
                    )}

                    {/* After Loading */}
                    {!loading && (
                        <>
                            {/* If orders exist */}
                            {orders.length > 0 ? (
                                <Container>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 paddingX mx-auto">
                                        {orders.map((order, index) => (
                                            <div key={index}>
                                                <OrderSummary transaction={order} />
                                            </div>
                                        ))}
                                    </div>
                                </Container>
                            ) : (
                                // Empty State Design
                                <div className="bg-white text-center rounded-lg p-10 max-w-3xl mx-auto">
                                    <p className="text-xl font-semibold mb-2">No orders yet</p>
                                    <p className="text-gray-600">Go to store to place an order.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Container>
        </>
    )
}

export default Orders;


const OrderSummary = ({ transaction }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/orders/${transaction.id}`, { state: { transaction } })}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg cursor-pointer transition"
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                    Transaction:{" "}
                    <span className="text-blue-600">{transaction.gateway_transaction_id}</span>
                </h2>
                <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${transaction.payment_status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {transaction.payment_status}
                </span>
            </div>
            <p className="text-sm text-gray-600">Quantity: {transaction.item_quantity}</p>
            <p className="text-sm text-gray-600">Final Amount: ${transaction.final_amount}</p>
            <p className="text-sm text-gray-500 mt-1">
                Date: {new Date(transaction.created_date).toLocaleString()}
            </p>
        </div>
    );
}