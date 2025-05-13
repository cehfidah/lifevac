import React, { useState } from "react";

export default function EditNameModal({ onClose }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSave = async () => {
        try {
            // call your API here
            await fetch("/api/update-profile", {
                method: "POST",
                body: JSON.stringify({ firstName, lastName }),
                headers: { "Content-Type": "application/json" }
            });
            onClose(); // close modal
            window.location.href = "/"; // navigate home
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                <div className="flex gap-2 mb-4">
                    <input className="w-1/2 border p-2 rounded" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input className="w-1/2 border p-2 rounded" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <p className="text-sm text-gray-500 mb-4">Email used for login can't be changed</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-gray-600">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-900 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}
