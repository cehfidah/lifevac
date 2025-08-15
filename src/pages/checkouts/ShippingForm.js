import Container from "../../components/Container";
import Select from "react-select";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OrderSummary from "./OrderSummary";


const ShippingForm = ({
    onSubmitForm,
    inputRefs,
    formErrors,
    formData,
    onChnage,
    addresses,
    selectedAddressId,
    handleAddressChange,
    countries,
    country,
    setCountry,
    states,
    selectedState,
    setSelectedState,
    phoneCode,
    setIsOpen,
    isOpen,
    selectedOption,
    shippingOptions,
    selected,
    setSelected,
    cartItems,
    shippingCost,
    discountAmount,
    discountPercent,
    couponCode,
    setCouponCode,
    handleApplyCoupon,
    couponLoading,
    couponError,
    couponSuccess,
    setFormErrors
}) => {
    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: formErrors.selectedState ? "red" : base.borderColor,
            "&:hover": {
                borderColor: formErrors.selectedState ? "red" : base.borderColor,
            },
            boxShadow: formErrors.selectedState ? "0 0 0 1px red" : base.boxShadow,
        }),
    };

    const handleStateChange = (option) => {
        setSelectedState(option);

        setFormErrors((prevErrors) => {
            const { selectedState, ...rest } = prevErrors; // remove selectedState only
            return rest;
        });
    };
    return (
        <>
            <Container>
                <div className="bg-white text-black paddingX py-4 md:py-8 grid md:grid-cols-2 gap-6">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <form onSubmit={onSubmitForm}>
                            {/* Delivery */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Account</h2>

                                <div>
                                    <p className="text-sm mb-1">Email</p>
                                    <input
                                        ref={(el) => (inputRefs.current.email = el)}
                                        autocomplete={true}
                                        className={`w-full border p-2 rounded ${formErrors.email ? "border-red-500" : ""}`}
                                        placeholder="First name"
                                        value={formData.email}
                                        onChange={(e) => onChnage("email", e.target.value)}
                                        type="email"
                                    />
                                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                                </div>

                                <h2 className="text-lg font-semibold">Shipping Address</h2>
                                {/* Dropdown */}
                                {addresses.length > 0 && (
                                    <select
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                        value={selectedAddressId}
                                        onChange={handleAddressChange}
                                    >
                                        {addresses.map((addr) => (
                                            <option key={addr.id} value={addr.id}>
                                                {addr.first_name} {addr.last_name} - {addr.address}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                <div className="mb-4">
                                    <p className="text-sm mb-1">Country/Region</p>
                                    <Select
                                        options={countries}
                                        value={country}
                                        onChange={setCountry}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            ref={(el) => (inputRefs.current.firstName = el)}
                                            autocomplete={true}
                                            className={`w-full border p-2 rounded ${formErrors.firstName ? "border-red-500" : ""}`}
                                            placeholder="First name"
                                            value={formData.firstName}
                                            onChange={(e) => onChnage("firstName", e.target.value)}
                                            type="text"
                                        />
                                        {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                                    </div>
                                    <div>
                                        <input
                                            ref={(el) => (inputRefs.current.lastName = el)}
                                            autocomplete={true}
                                            className={`w-full border p-2 rounded ${formErrors.lastName ? "border-red-500" : ""}`}
                                            placeholder="Last name"
                                            value={formData.lastName}
                                            onChange={(e) => onChnage("lastName", e.target.value)}
                                            type="text"
                                        />
                                        {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input
                                        ref={(el) => (inputRefs.current.address = el)}
                                        autocomplete={true}
                                        className={`w-full border p-2 rounded ${formErrors.address ? "border-red-500" : ""}`}
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={(e) => onChnage("address", e.target.value)}
                                        type="text"
                                    />
                                    {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                                </div>
                                <div>
                                    <input
                                        className="w-full border p-2 mb-2 rounded"
                                        placeholder="Apartment, suite, etc (optional)"
                                        value={formData.apt}
                                        onChange={(e) => onChnage("apt", e.target.value)}
                                        type="text"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <input
                                            ref={(el) => (inputRefs.current.city = el)}
                                            autocomplete={true}
                                            className={`w-full border p-2 rounded ${formErrors.city ? "border-red-500" : ""}`}
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={(e) => onChnage("city", e.target.value)}
                                            type="text"
                                        />
                                        {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                                    </div>
                                    <div>
                                        <Select
                                            ref={(el) => (inputRefs.current.selectedState = el)}
                                            styles={customSelectStyles}
                                            options={states}
                                            value={selectedState}
                                            onChange={handleStateChange}
                                            placeholder="State"
                                        />
                                        {formErrors.selectedState && <p className="text-red-500 text-sm">{formErrors.selectedState}</p>}
                                    </div>
                                    <div>
                                        <input
                                            ref={(el) => (inputRefs.current.zip = el)}
                                            autocomplete={true}
                                            className={`w-full border p-2 rounded ${formErrors.zip ? "border-red-500" : ""}`}
                                            placeholder="ZIP code"
                                            value={formData.zip}
                                            onChange={(e) => onChnage("zip", e.target.value)}
                                            type="text"
                                        />
                                        {formErrors.zip && <p className="text-red-500 text-sm">{formErrors.zip}</p>}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm mb-1">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <span className="border px-2 py-1 rounded bg-gray-100">
                                            +{phoneCode}
                                        </span>
                                        <input
                                            ref={(el) => (inputRefs.current.phone = el)}
                                            autocomplete={true}
                                            className={`w-full border p-2 rounded ${formErrors.phone ? "border-red-500" : ""}`}
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={(e) => onChnage("phone", e.target.value)}
                                            type="text"
                                        />
                                    </div>
                                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                                </div>
                            </div>

                            <div className="w-full border-b border-gray-200 pb-2 my-6">
                                {/* Toggle Header */}
                                <div
                                    className="flex justify-between items-start cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <div>
                                        <h4 className="text-lg font-semibold">Shipping method</h4>
                                        <p className="text-sm font-medium text-black mt-1">
                                            {selectedOption.label} ·{" "}
                                            <span className="font-bold">${selectedOption.price}</span>
                                        </p>
                                        <p className="text-sm text-gray-500">{selectedOption.description}</p>
                                    </div>
                                    <div className="pt-1">
                                        {isOpen ? (
                                            <IoIosArrowUp className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <IoIosArrowDown className="w-5 h-5 text-gray-600" />
                                        )}
                                    </div>
                                </div>

                                {/* Dropdown List */}
                                {isOpen && (
                                    <div className="mt-4 space-y-2">
                                        {shippingOptions.map((option) => (
                                            <label
                                                key={option.id}
                                                className="flex items-start justify-between p-2 border border-gray-200 rounded cursor-pointer bg-[#f5f6fd]"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-black">{option.label}</span>
                                                    <span className="text-sm text-gray-500">{option.description}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-semibold text-black">${option.price}</span>
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        value={option.id}
                                                        checked={selected === option.id}
                                                        onChange={() => setSelected(option.id)}
                                                        className="form-radio text-indigo-600"
                                                    />
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-2 mx-auto mt-4">
                                <h2 className="text-lg font-semibold">Secure Checkout</h2>
                                <p className="text-sm text-[#162950]">
                                    All transactions are secure and encrypted. Your order includes
                                    free returns and 24/7 access to our award-winning customer
                                    service
                                </p>

                                <button
                                    type="submit"
                                    className="flex justify-center items-center w-full bg-[#162950] text-white text-base font-bold rounded-xl py-4"
                                >
                                    Complete Purchase
                                </button>

                            </div>
                        </form>

                    </div>
                    <div className="md:sticky md:top-6 md:self-start w-full">
                        <OrderSummary
                            cartItems={cartItems}
                            shippingCost={shippingCost}
                            discountAmount={discountAmount}
                            discountPercent={discountPercent}
                            couponCode={couponCode}
                            setCouponCode={setCouponCode}
                            handleApplyCoupon={handleApplyCoupon}
                            couponLoading={couponLoading}
                            couponError={couponError}
                            couponSuccess={couponSuccess}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ShippingForm;
