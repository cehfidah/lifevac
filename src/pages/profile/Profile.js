import SEO from '../../utils/SEO';
import React, { useState } from "react";
import EditNameModal from "./EditNameModal";
import EditAddressModal from "./EditAddressModal";

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
            <div className="px-10 py-8 bg-gray-100 min-h-screen">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>

                {/* Name + Email Section */}
                <div className="bg-white rounded-md shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">Name</p>
                        <button onClick={() => setShowNameModal(true)} className="text-blue-600 hover:underline text-sm">✏️</button>
                    </div>
                    <p>Email</p>
                    <p className="text-sm text-gray-600">creativekirtandoshi@gmail.com</p>
                </div>

                {/* Address Section */}
                <div className="bg-white rounded-md shadow-sm p-6">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">Addresses</p>
                        <button onClick={() => setShowAddressModal(true)} className="text-blue-600 hover:underline text-sm">✏️</button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Default address: India</p>
                </div>

                {/* Modals */}
                {showNameModal && <EditNameModal onClose={() => setShowNameModal(false)} />}
                {showAddressModal && <EditAddressModal onClose={() => setShowAddressModal(false)} />}
            </div>
        </>
    );
}
