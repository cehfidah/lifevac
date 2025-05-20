import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiHandler } from "../../helper/ApiHandler";
import { toast } from "react-toastify";
import Loading from '../../components/Common/Loading';

export default function EditAddressModal({ onClose, mode = "add", addressData = null, fetchData, userId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const countries = Country.getAllCountries().map((c) => ({
        label: c.name,
        value: c.isoCode,
    }));

    const [country, setCountry] = useState({ label: "United States", value: "US" });
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [phoneCode, setPhoneCode] = useState("91");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        apt: "",
        city: "",
        zip: "",
        phone: "",
        is_default: false,
    });

    useEffect(() => {
        if (addressData) {
            const selectedCountry = Country.getAllCountries().find(
                (c) =>
                    c.name === addressData.country ||
                    c.phonecode === addressData.country_code ||
                    c.isoCode === addressData.country_code
            );

            const selectedCountryIso = selectedCountry?.isoCode || "IN";
            const selectedCountryLabel = selectedCountry?.name || "India";
            const phonecode = selectedCountry?.phonecode || "91";

            const stateList = State.getStatesOfCountry(selectedCountryIso);
            const matchedState = stateList.find((s) => s.name === addressData.state);

            setCountry({ label: selectedCountryLabel, value: selectedCountryIso });
            setPhoneCode(phonecode);
            setStates(stateList.map((s) => ({ label: s.name, value: s.isoCode })));
            setSelectedState(matchedState ? { label: matchedState.name, value: matchedState.isoCode } : null);

            setForm({
                firstName: addressData.first_name || "",
                lastName: addressData.last_name || "",
                address: addressData.address || "",
                apt: addressData.apartment || "",
                city: addressData.city || "",
                zip: addressData.zip_code || "",
                phone: addressData.phone || "",
                is_default: addressData.is_default_address === "1" ? true : false,
            });
        }
    }, [addressData]);

    useEffect(() => {
        if (country?.value) {
            const stateList = State.getStatesOfCountry(country.value);
            setStates(stateList.map((s) => ({ label: s.name, value: s.isoCode })));
            const code = Country.getCountryByCode(country.value)?.phonecode;
            setPhoneCode(code || "91");
        }
    }, [country]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!country || !selectedState || !form.firstName || !form.address || !form.city || !form.zip || !form.phone) {
            return toast.error("All required fields must be filled");
        }

        const payload = {
            first_name: form.firstName,
            last_name: form.lastName,
            address: form.address,
            apartment: form.apt,
            city: form.city,
            state: selectedState.label,
            zip_code: form.zip,
            phone: form.phone,
            country: country.label,
            country_code: phoneCode,
            is_default: form.is_default === true ? "1" : "0"
        };

        const body =
            mode === "edit"
                ? { id: addressData.id, ...payload }
                : { user_id: userId, ...payload };

        const endpoint = mode === "add" ? "/add_address.php" : "/edit_address.php";
        try {
            setLoading(true);
            const res = await ApiHandler(endpoint, "POST", body, token, dispatch, navigate);
            if (res.data?.status === "1") {
                toast.success(res.data.msg || `${mode === "add" ? "Added" : "Updated"} address successfully`);
                onClose();
                fetchData();
            } else {
                toast.error(res.data.msg || "Failed to save address");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{mode === "add" ? "Add Address" : "Edit Address"}</h3>
                <label className="flex items-center gap-2 mb-2">
                    <input type="checkbox" checked={form.is_default} onChange={e => handleChange("is_default", e.target.checked)} />
                    This is my default address
                </label>
                <div className="mb-4">
                    <p className="text-sm mb-1">Country/Region</p>
                    <Select options={countries} value={country} onChange={setCountry} />
                </div>
                <div className="flex gap-2 mb-4">
                    <input className="w-1/2 border p-2 rounded" placeholder="First name" value={form.firstName} onChange={e => handleChange("firstName", e.target.value)} />
                    <input className="w-1/2 border p-2 rounded" placeholder="Last name" value={form.lastName} onChange={e => handleChange("lastName", e.target.value)} />
                </div>
                <input className="w-full border p-2 mb-2 rounded" placeholder="Address" value={form.address} onChange={e => handleChange("address", e.target.value)} />
                <input className="w-full border p-2 mb-2 rounded" placeholder="Apartment, suite, etc (optional)" value={form.apt} onChange={e => handleChange("apt", e.target.value)} />
                <div className="flex gap-2 mb-2">
                    <input className="w-1/3 border p-2 rounded" placeholder="City" value={form.city} onChange={e => handleChange("city", e.target.value)} />
                    <Select
                        className="w-1/3"
                        options={states}
                        value={selectedState}
                        onChange={setSelectedState}
                        placeholder="State"
                    />
                    <input className="w-1/3 border p-2 rounded" placeholder="ZIP code" value={form.zip} onChange={e => handleChange("zip", e.target.value)} />
                </div>
                <div className="mb-4">
                    <p className="text-sm mb-1">Phone</p>
                    <div className="flex items-center gap-2">
                        <span className="border px-2 py-1 rounded bg-gray-100">+{phoneCode}</span>
                        <input className="w-full border p-2 rounded" placeholder="Phone number" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
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
