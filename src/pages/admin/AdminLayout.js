import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaSignOutAlt, FaUsers , FaTags } from 'react-icons/fa';
import { logout } from '../../store/slice/authSlice'; // We will create this action

const AdminLayout = () => {
    const { token, isAdmin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    // If there's no token or the user is not an admin, redirect to login
    if (!token || !isAdmin) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0d2240] text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-grow">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `flex items-center py-4 px-6 transition-colors duration-200 hover:bg-gray-700 ${
                                isActive ? 'bg-gray-700' : ''
                            }`
                        }
                    >
                        <FaTachometerAlt className="mr-3" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            `flex items-center py-4 px-6 transition-colors duration-200 hover:bg-gray-700 ${
                                isActive ? 'bg-gray-700' : ''
                            }`
                        }
                    >
                        <FaBox className="mr-3" />
                        Manage Orders
                    </NavLink>
                    <NavLink
    to="/admin/users"
    className={({ isActive }) => `flex items-center py-4 px-6 ...`}
>
    <FaUsers className="mr-3" />
    Manage Users
</NavLink>
<NavLink
    to="/admin/coupons"
    className={({ isActive }) => `flex items-center py-4 px-6 ...`}
>
    <FaTags className="mr-3" />
    Manage Coupons
</NavLink>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full py-2 px-4 rounded text-left text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200"
                    >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto">
                    <Outlet /> {/* This will render the nested route component */}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;