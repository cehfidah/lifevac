import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiHandler } from '../../helper/ApiHandler';
import { setAdminCredentials } from '../../store/slice/authSlice'; // We will create this action
import Loading from '../../components/Common/Loading';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, isAdmin } = useSelector((state) => state.auth);

    // If already logged in as admin, redirect to the dashboard
    if (token && isAdmin) {
        return <Navigate to="/admin/dashboard" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter an email.');
            return;
        }
        setLoading(true);

        try {
            const response = await ApiHandler(
                '/admin_login.php',
                'POST',
                { email }
            );

            if (response.data.status === '1' && response.data.data.token) {
                const { token } = response.data.data;
                dispatch(setAdminCredentials({ token }));
                toast.success('Login successful!');
                navigate('/admin/dashboard');
            } else {
                toast.error(response.data.msg || 'Login failed.');
            }
        } catch (error) {
            toast.error('An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 font-semibold text-white bg-[#0d2240] rounded-md hover:bg-[#0b1c33] transition-colors"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;