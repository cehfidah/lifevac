import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiHandler } from '../../helper/ApiHandler';
import Loading from '../../components/Common/Loading';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount_percent: '' });
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const response = await ApiHandler('/get_all_coupons.php', 'GET', null, token, dispatch, navigate);
            if (response.data.status === '1') {
                setCoupons(response.data.data);
            } else {
                toast.error('Failed to fetch coupons.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, [token, dispatch, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await ApiHandler('/create_coupon.php', 'POST', newCoupon, token, dispatch, navigate);
            if (response.data.status === '1') {
                toast.success('Coupon created successfully!');
                setNewCoupon({ code: '', discount_percent: '' });
                fetchCoupons();
            } else {
                toast.error(response.data.msg || 'Failed to create coupon.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleStatusToggle = async (couponId, currentStatus) => {
        setLoading(true);
        const payload = { id: couponId, is_active: currentStatus ? 0 : 1 };
        try {
            const response = await ApiHandler('/update_coupon_status.php', 'POST', payload, token, dispatch, navigate);
            if (response.data.status === '1') {
                toast.success('Coupon status updated!');
                fetchCoupons();
            } else {
                toast.error('Failed to update status.');
            }
        } catch(error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Coupons</h1>
            
            {/* Create Coupon Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>
                <form onSubmit={handleCreateCoupon} className="grid md:grid-cols-3 gap-4 items-end">
                    <input name="code" value={newCoupon.code} onChange={handleInputChange} placeholder="Coupon Code (e.g., SAVE20)" required className="w-full border p-2 rounded" />
                    <input name="discount_percent" type="number" value={newCoupon.discount_percent} onChange={handleInputChange} placeholder="Discount % (e.g., 20)" required className="w-full border p-2 rounded" />
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Create Coupon</button>
                </form>
            </div>

            {/* Coupons Table */}
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Existing Coupons</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{coupon.code}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{coupon.discount_percent}%</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coupon.is_active === '1' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {coupon.is_active === '1' ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleStatusToggle(coupon.id, coupon.is_active === '1')} className="text-indigo-600 hover:text-indigo-900 text-sm">
                                        Toggle Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupons;