import { useEffect, useState } from "react";
import SEO from '../../utils/SEO';
import EditNameModal from "./EditNameModal";
import EditAddressModal from "./EditAddressModal";
import { MdOutlineEdit } from "react-icons/md";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApiHandler } from "../../helper/ApiHandler";
import { toast } from "react-toastify";
import Loading from "../../components/Common/Loading";
import { setUserData } from "../../store/slice/authSlice";

export default function ProfilePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);
    const [showNameModal, setShowNameModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [getProfileData, setGetProfileData] = useState(null);
    const [getAddressData, setGetAddressData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const getProfile = await ApiHandler("/get_profile.php", "POST", undefined, token, dispatch, navigate);
            if (getProfile.data.status === "1" && getProfile.data.data.length > 0) {
                setGetProfileData(getProfile.data.data[0]);
                dispatch(setUserData(getProfile.data.data[0]));
            }

            const getAddress = await ApiHandler("/get_address.php", "POST", undefined, token, dispatch, navigate);
            if (getAddress.data.status === "1" && getAddress.data.data.length > 0) {
                setGetAddressData(getAddress.data.data);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditAddress = (index) => {
        setEditingIndex(index);
        setShowAddressModal(true);
    };

    const handleAddAddress = () => {
        setEditingIndex(null); // This means "add" mode
        setShowAddressModal(true);
    };

    if (loading) return <Loading />;

    return (
        <>
           <SEO
  title="Your Profile - LifeVac Account Settings"
  description="Manage your LifeVac account, update your personal information, and review your communication preferences. Your profile data is secure and easy to manage."
  keywords="LifeVac profile, account dashboard, user settings, edit profile, change password"
  ogTitle="LifeVac Profile Page"
  ogDescription="Access your LifeVac profile to manage account details and preferences. Your personal information is protected."
  twitterTitle="LifeVac Profile | Account Management"
  twitterDescription="Easily manage your personal data and account settings for your LifeVac profile."
/>

            <div className="bg-[#f3f3f3]">
                <Container>
                    <div className="paddingX py-10 leading-relaxed">
                        <h2 className="text-xl md:text-2xl font-semibold mb-6">Profile</h2>

                        {/* Name + Email Section */}
                        <div className="bg-white rounded-[12px] px-3 py-6 mb-6">
                            <div className="px-3">
                                <div className="flex gap-10 items-start">
                                    <p className="text-base font-bold text-gray-700">Name</p>
                                    <button onClick={() => setShowNameModal(true)} className="text-blue-900 hover:underline text-sm">
                                        <MdOutlineEdit size={22} />
                                    </button>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700 mt-4">Email</p>
                                    <p className="text-sm text-black font-bold">{getProfileData?.email}</p>
                                </div>

                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="bg-white rounded-[12px] px-3 py-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-5 px-3">
                                        <p className="text-base font-bold text-gray-700 mb-1">Addresses</p>
                                        <button
                                            onClick={handleAddAddress}
                                            className="text-blue-900 text-base font-bold"
                                        >
                                            + Add
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                                        {getAddressData.length > 0 ? (
                                            getAddressData.map((address, idx) => (
                                                <div
                                                    key={address.id}
                                                    className="flex justify-between items-start gap-5 px-3 py-4 mb-2 bg-[#f9f9f9] hover:bg-[#f0f0f0] rounded-[12px]"
                                                >
                                                    <div>
                                                        <p className="text-sm text-gray-400 mb-1">{address.is_default_address === "1" ? "Default Address" : `Address ${idx + 1}`}</p>
                                                        <p className="text-sm text-black font-semibold">
                                                            {address.first_name} {address.last_name}
                                                        </p>
                                                        <p className="text-sm text-gray-700">
                                                            {address.address}, {address.apartment}, {address.city}, {address.state} - {address.zip_code}
                                                        </p>
                                                        <p className="text-sm text-gray-700 mt-1">Phone: {address.phone}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleEditAddress(idx)}
                                                        className="text-blue-900 hover:underline"
                                                    >
                                                        <MdOutlineEdit size={22} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-start gap-10 group hover:bg-[#f5f5f5] p-3 rounded-[12px]">
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-1">Default address</p>
                                                    <p className="text-sm text-gray-700">United States</p>
                                                </div>
                                                <button onClick={handleAddAddress} className="text-blue-900 hover:underline text-sm">
                                                    <MdOutlineEdit size={22} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* Modals */}
                        {showNameModal && (
                            <EditNameModal
                                onClose={() => {
                                    setShowNameModal(false);
                                }}
                                fetchData={fetchData} // Refresh addresses
                                firstName={getProfileData?.first_name}
                                lastName={getProfileData?.last_name}
                                email={getProfileData?.email}
                            />
                        )}

                        {showAddressModal && (
                            <EditAddressModal
                                onClose={() => {
                                    setShowAddressModal(false);
                                    setEditingIndex(null);
                                }}
                                fetchData={fetchData} // Refresh addresses
                                mode={editingIndex !== null ? "edit" : "add"}
                                addressData={editingIndex !== null ? getAddressData[editingIndex] : null}
                                userId={getProfileData?.id}
                            />
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
}
