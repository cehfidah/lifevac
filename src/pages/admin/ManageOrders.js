import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiHandler } from '../../helper/ApiHandler';
import Loading from '../../components/Common/Loading';
import { FaBoxOpen, FaShippingFast, FaUserCircle } from 'react-icons/fa';

// Main Component: ManageOrders
const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingOrder, setEditingOrder] = useState(null);

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await ApiHandler(
                '/get_all_orders.php',
                'POST',
                { page: 0, perpage: 100 },
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
        if (token) {
            fetchOrders();
        }
    }, [token, dispatch, navigate]);

    const handleViewClick = (order) => setSelectedOrder(order);
    const handleEditClick = (order) => setEditingOrder(order);

    const handleModalClose = (shouldRefresh) => {
        setSelectedOrder(null);
        setEditingOrder(null);
        if (shouldRefresh) {
            fetchOrders();
        }
    };

    if (loading && orders.length === 0) return <Loading />;

    return (
        <div className="space-y-6 p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone #</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => {
                            // Using an explicit return and clean structure to avoid whitespace issues
                            return (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.gateway_transaction_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.shipping_address.firstName} {order.shipping_address.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shipping_address.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${parseFloat(order.final_amount).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.order_status === 'Shipped' || order.order_status === 'Delivered' ? 'bg-green-100 text-green-800' : order.order_status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <button onClick={() => handleViewClick(order)} className="text-gray-500 hover:text-blue-600">View</button>
                                        <button onClick={() => handleEditClick(order)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={handleModalClose} />}
            {editingOrder && <UpdateOrderModal order={editingOrder} onClose={handleModalClose} token={token} />}
        </div>
    );
};

// --- Sub-components (OrderDetailsModal, UpdateOrderModal) remain the same ---

const OrderDetailsModal = ({ order, onClose }) => {
    const { shipping_address: shipping, product_detail: products } = order;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                    <button onClick={() => onClose(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><FaUserCircle className="mr-2 text-blue-500" />Customer Details</h3>
                            <p className="text-sm text-gray-600"><strong>Name:</strong> {shipping.firstName} {shipping.lastName}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {order.user_email}</p>
                            <p className="text-sm text-gray-600"><strong>Phone:</strong> {shipping.phone || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><FaShippingFast className="mr-2 text-green-500" />Shipping Address</h3>
                            <p className="text-sm text-gray-600">{shipping.address}, {shipping.apt || ''}</p>
                            <p className="text-sm text-gray-600">{shipping.city}, {shipping.state} {shipping.zip}</p>
                            <p className="text-sm text-gray-600">{shipping.country}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><FaBoxOpen className="mr-2 text-yellow-500" />Order Summary</h3>
                        <div className="space-y-4">
                            {products.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded-md">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-md bg-white border" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{item.sectionTitle}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-sm">${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-4 pt-4 text-right space-y-1">
                            <p className="text-lg font-bold text-gray-800">Total: ${parseFloat(order.final_amount).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={() => onClose(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">Close</button>
                </div>
            </div>
        </div>
    );
};

const UpdateOrderModal = ({ order, onClose, token }) => {
    const [status, setStatus] = useState(order.order_status || 'Processing');
    const [carrier, setCarrier] = useState(order.shipping_carrier || '');
    const [tracking, setTracking] = useState(order.tracking_number || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const payload = {
            order_id: order.id,
            order_status: status,
            shipping_carrier: carrier,
            tracking_number: tracking,
        };
        try {
            const response = await ApiHandler('/update_order_status.php', 'POST', payload, token, dispatch, navigate);
            if (response.data.status === '1') {
                toast.success('Order updated successfully!');
                onClose(true);
            } else {
                toast.error(response.data.msg || 'Failed to update order.');
            }
        } catch (error) {
            toast.error('An error occurred while updating the order.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Update Order #{order.gateway_transaction_id}</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Order Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shipping Carrier</label>
                        <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="">Select a Carrier</option>
                            <option value="FedEx">FedEx</option>
                            <option value="UPS">UPS</option>
                            <option value="USPS">USPS</option>
                            <option value="DHL">DHL</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                        <input type="text" value={tracking} onChange={(e) => setTracking(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={() => onClose(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Update Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageOrders;