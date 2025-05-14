import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from '../../utils/SEO';
import Container from "../../components/Container";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <SEO
                title="User Settings - AirwayClear"
                description="Manage your AirwayClear account settings including preferences, notifications, and profile details."
                keywords="AirwayClear settings, user preferences, profile management"
                ogTitle="AirwayClear Account Settings"
                ogDescription="Update and personalize your AirwayClear account."
                twitterTitle="Account Settings - AirwayClear"
                twitterDescription="Modify your AirwayClear account settings."
            />

            <div className="paddingX py-10">
                <Container>
                    <h2 className="text-2xl font-bold mb-8">Settings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Left Section */}
                        <div>
                            <div className="flex items-center mb-2 space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 11c0-.552.224-1.052.586-1.414A1.993 1.993 0 0114 9a1.993 1.993 0 011.414.586c.362.362.586.862.586 1.414 0 .552-.224 1.052-.586 1.414A1.993 1.993 0 0114 13a1.993 1.993 0 01-1.414-.586A1.993 1.993 0 0112 11z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19c-4.418 0-8-3.582-8-8 0-1.25.282-2.438.784-3.5L12 13l7.216-7.216A7.964 7.964 0 0120 11c0 4.418-3.582 8-8 8z"
                                    />
                                </svg>
                                <p className="text-base font-semibold text-gray-800">
                                    Log out everywhere
                                </p>
                            </div>
                            <p className="text-base text-gray-600 max-w-md">
                                If you've lost a device or have security concerns, log out
                                everywhere to ensure the security of your account.
                            </p>
                        </div>

                        {/* Right Section */}
                        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-wrap items-center justify-center gap-6">
                            <button
                                onClick={handleLogout}
                                className="border border-gray-300 text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
                            >
                                Log out everywhere
                            </button>
                            <p className="text-sm text-gray-600 ml-4">
                                You will be logged out on this device as well.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Settings;