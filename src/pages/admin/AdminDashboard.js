import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiHandler } from '../../helper/ApiHandler';
import Loading from '../../components/Common/Loading';
import { FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa';

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className={`text-3xl p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await ApiHandler(
                    '/get_dashboard_data.php',
                    'GET',
                    null,
                    token,
                    dispatch,
                    navigate
                );
                if (response.data.status === '1') {
                    setData(response.data.data);
                } else {
                    toast.error('Failed to fetch dashboard data.');
                }
            } catch (error) {
                toast.error('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, dispatch, navigate]);

    if (loading) return <Loading />;
    if (!data) return <p>No data available.</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={<FaDollarSign />}
                    title="Total Sales"
                    value={`$${parseFloat(data.total_sales).toFixed(2)}`}
                    color="bg-green-100 text-green-600"
                />
                <StatCard
                    icon={<FaShoppingCart />}
                    title="Total Orders"
                    value={data.total_orders}
                    color="bg-blue-100 text-blue-600"
                />
                <StatCard
                    icon={<FaUsers />}
                    title="Total Customers"
                    value={data.total_customers}
                    color="bg-yellow-100 text-yellow-600"
                />
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.recent_orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.gateway_transaction_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user_email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.final_amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;