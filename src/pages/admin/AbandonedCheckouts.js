import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiHandler } from '../../helper/ApiHandler';
import Loading from '../../components/Common/Loading';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const AbandonedCheckouts = () => {
    const [checkouts, setCheckouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCheckout, setSelectedCheckout] = useState(null);

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCheckouts = async () => {
            setLoading(true);
            try {
                const response = await ApiHandler(
                    '/get_abandoned_checkouts.php',
                    'POST',
                    {}, // No payload is needed for this request
                    token,
                    dispatch,
                    navigate
                );
                if (response.data.status === '1') {
                    setCheckouts(response.data.data);
                } else {
                    toast.error(response.data.msg || 'Failed to fetch abandoned checkouts.');
                }
            } catch (error) {
                toast.error('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCheckouts();
        }
    }, [token, dispatch, navigate]);

    if (loading) return <Loading />;

    return (
        <div className="space-y-6 p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-800">Abandoned Checkouts</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cart Total</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {checkouts.length > 0 ? (
                            checkouts.map((checkout) => (
                                <tr key={checkout.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(checkout.updated_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{checkout.shipping_address?.firstName} {checkout.shipping_address?.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{checkout.user_email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${parseFloat(checkout.final_amount).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => setSelectedCheckout(checkout)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">No abandoned checkouts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedCheckout && <CheckoutDetailsModal checkout={selectedCheckout} onClose={() => setSelectedCheckout(null)} />}
        </div>
    );
};

// Sub-component to display the details of the abandoned cart in a modal
const CheckoutDetailsModal = ({ checkout, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Abandoned Cart Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><FaUserCircle className="mr-2 text-blue-500" />Customer & Shipping Info</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Name:</strong> {checkout.shipping_address?.firstName} {checkout.shipping_address?.lastName}</p>
                            <p><strong>Email:</strong> {checkout.user_email}</p>
                            <p><strong>Phone:</strong> {checkout.shipping_address?.phone || 'N/A'}</p>
                            <p className="pt-2"><strong>Address:</strong> {checkout.shipping_address?.address}, {checkout.shipping_address?.apt || ''}</p>
                            <p>{checkout.shipping_address?.city}, {checkout.shipping_address?.state} {checkout.shipping_address?.zip}</p>
                            <p>{checkout.shipping_address?.country}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><FaShoppingCart className="mr-2 text-green-500" />Cart Items</h3>
                        <div className="space-y-3">
                            {checkout.product_detail.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded-md">
                                    <img src={item.image} alt={item.title} className="w-12 h-12 object-contain rounded-md bg-white border" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{item.sectionTitle || item.title}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-sm">${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                         <div className="border-t mt-4 pt-4 text-right">
                            <p className="text-lg font-bold text-gray-800">Cart Total: ${parseFloat(checkout.final_amount).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">Close</button>
                </div>
            </div>
        </div>
    );
};

export default AbandonedCheckouts;