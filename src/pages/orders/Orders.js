import React, { useEffect, useState } from 'react';
import SEO from '../../utils/SEO';
import Container from '../../components/Container';

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Simulate loading for 3 seconds
        setTimeout(() => {
            // Example: Replace with actual API call
            const fetchedOrders = []; // Try adding mock data here like [{ id: 1, title: "Order #1" }] to test cards
            setOrders(fetchedOrders);
            setLoading(false);
        }, 3000);
    }, []);

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
                <div className="bg-gray-100 min-h-screen paddingX py-10">
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
                                <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                                    {orders.map((order, index) => (
                                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                            <h2 className="font-bold text-lg">Order #{order.id}</h2>
                                            <p className="text-gray-600 mt-2">Details: {order.title}</p>
                                        </div>
                                    ))}
                                </div>
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
