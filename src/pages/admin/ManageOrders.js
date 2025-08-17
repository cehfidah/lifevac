import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiHandler } from '../../helper/ApiHandler';
import Loading from '../../components/Common/Loading';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState(null); // State to hold order being edited
    const [trackingNumber, setTrackingNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await ApiHandler(
                '/get_all_orders.php',
                'POST',
                { page: 0, perpage: 50 }, // Add pagination later
                token,
                dispatch,
                navigate
            );
            if (response.data.status === '1') {
                setOrders(response.data.data);
            } else {
                toast.error('Failed to fetch orders.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token, dispatch, navigate]);

    const handleEditClick = (order) => {
        setEditingOrder(order);
        setTrackingNumber(order.tracking_number || '');
        setOrderStatus(order.order_status);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingOrder) return;

        setLoading(true);
        const payload = {
            order_id: editingOrder.id,
            order_status: orderStatus,
            tracking_number: trackingNumber,
        };

        try {
            const response = await ApiHandler(
                '/update_order_status.php',
                'POST',
                payload,
                token,
                dispatch,
                navigate
            );

            if (response.data.status === '1') {
                toast.success('Order updated successfully!');
                setEditingOrder(null);
                fetchOrders(); // Refresh the list
            } else {
                toast.error(response.data.msg || 'Failed to update order.');
            }
        } catch (error) {
            toast.error('An error occurred while updating the order.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !editingOrder) return <Loading />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking #</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.gateway_transaction_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shipping_address.firstName} {order.shipping_address.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.final_amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.order_status === 'Shipped' ? 'bg-green-100 text-green-800' :
                                        order.order_status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {order.order_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.tracking_number || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEditClick(order)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Order Modal */}
            {editingOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Update Order #{editingOrder.gateway_transaction_id}</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Order Status</label>
                                <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option>Processing</option>
                                    <option>Shipped</option>
                                    <option>Delivered</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                                <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={() => setEditingOrder(null)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" disabled={loading}>{loading ? 'Updating...' : 'Update Order'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;