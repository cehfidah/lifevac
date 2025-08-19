import React, { useState } from "react";
import { ApiHandler } from "../../helper/ApiHandler";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditNameModal({ onClose, firstName: initialFirst, lastName: initialLast, email, fetchData }) {
    const [firstName, setFirstName] = useState(initialFirst || "");
    const [lastName, setLastName] = useState(initialLast || "");
    const { token } = useSelector((state) => state.auth);
    const [emailValue, setEmailValue] = useState(email || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const res = await ApiHandler(
                "/edit_profile.php",
                "POST",
                { first_name: firstName, last_name: lastName, email: emailValue },
                token,
                dispatch,
                navigate
            );

            console.log("API response:", res.data); // For debugging

            if (res.data?.status === "1") {
                toast.success(res.data.msg || "Profile updated successfully");
                onClose();
                fetchData();
            } else {
                toast.error(res.data?.msg || "Failed to update profile");
            }
        } catch (err) {
            console.error("API call error:", err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                <div className="flex gap-2 mb-4">
                    <input
                        className="w-1/2 border p-2 rounded"
                        placeholder="First name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input
                        className="w-1/2 border p-2 rounded"
                        placeholder="Last name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <input
                    className="w-full border p-2 mb-1 rounded"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Email"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-gray-600">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-blue-900 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
