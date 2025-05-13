import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";

export default function EditAddressModal({ onClose }) {
    const countries = Country.getAllCountries().map(c => ({ label: c.name, value: c.isoCode }));
    const [country, setCountry] = useState({ label: "India", value: "IN" });
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [phoneCode, setPhoneCode] = useState("+91");

    useEffect(() => {
        if (country?.value) {
            const stateList = State.getStatesOfCountry(country.value);
            setStates(stateList.map(s => ({ label: s.name, value: s.isoCode })));
            setPhoneCode(Country.getCountryByCode(country.value)?.phonecode || "");
        }
    }, [country]);

    const handleSubmit = async () => {
        if (!country || !selectedState) return alert("All fields are required");
        await fetch("/api/update-address", {
            method: "POST",
            body: JSON.stringify({ country: country.label, state: selectedState.label, phoneCode }),
            headers: { "Content-Type": "application/json" }
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Add Address</h3>
                <label className="flex items-center gap-2 mb-2">
                    <input type="checkbox" className="border" /> This is my default address
                </label>
                <div className="mb-4">
                    <p className="text-sm mb-1">Country/Region</p>
                    <Select options={countries} value={country} onChange={setCountry} />
                </div>
                <div className="flex gap-2 mb-4">
                    <input className="w-1/2 border p-2 rounded" placeholder="First name" required />
                    <input className="w-1/2 border p-2 rounded" placeholder="Last name" required />
                </div>
                <input className="w-full border p-2 mb-2 rounded" placeholder="Address" required />
                <input className="w-full border p-2 mb-2 rounded" placeholder="Apartment, suite, etc (optional)" />
                <div className="flex gap-2 mb-2">
                    <input className="w-1/3 border p-2 rounded" placeholder="City" required />
                    <Select
                        className="w-1/3"
                        options={states}
                        value={selectedState}
                        onChange={setSelectedState}
                        placeholder="State"
                    />
                    <input className="w-1/3 border p-2 rounded" placeholder="ZIP code" required />
                </div>
                <div className="mb-4">
                    <p className="text-sm mb-1">Phone</p>
                    <div className="flex items-center gap-2">
                        <span className="border px-2 py-1 rounded bg-gray-100">+{phoneCode}</span>
                        <input className="w-full border p-2 rounded" placeholder="Phone number" required />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-gray-600">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-900 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}
