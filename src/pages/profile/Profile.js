import { useState } from "react";
import SEO from '../../utils/SEO';
import EditNameModal from "./EditNameModal";
import EditAddressModal from "./EditAddressModal";
import { MdOutlineEdit } from "react-icons/md";

export default function ProfilePage() {
    const [showNameModal, setShowNameModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    return (
        <>
            <SEO
                title="Your Profile - AirwayClear"
                description="Manage your AirwayClear profile, account settings, and view your saved preferences."
                keywords="AirwayClear profile, account dashboard, user settings"
                ogTitle="Profile Page - AirwayClear"
                ogDescription="Edit your profile and view account information."
                twitterTitle="Profile - AirwayClear"
                twitterDescription="Manage your AirwayClear account and personal data."
            />

            <div className="bg-[#f3f3f3] min-h-screen px-6 md:px-20 py-10 leading-relaxed">
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
                            <p className="text-sm text-black font-bold">creativekirtandoshi@gmail.com</p>
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
                                    onClick={() => setShowAddressModal(true)}
                                    className="text-blue-900 text-base font-bold"
                                >
                                    + Add
                                </button>
                            </div>
                            <div className="flex items-start gap-10 group hover:bg-[#f5f5f5] p-3 rounded-[12px]">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Default address</p>
                                    <p className="text-sm text-gray-700">India</p>
                                </div>
                                <button onClick={() => setShowAddressModal(true)} className="text-blue-900 hover:underline text-sm">
                                    <MdOutlineEdit size={22} />
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Modals */}
                {showNameModal && <EditNameModal onClose={() => setShowNameModal(false)} />}
                {showAddressModal && <EditAddressModal onClose={() => setShowAddressModal(false)} />}
            </div>
        </>
    );
}
