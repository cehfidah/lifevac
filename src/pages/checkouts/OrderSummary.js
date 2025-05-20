import { FaTag } from "react-icons/fa";

const OrderSummary = ({ cartItems, shippingCost }) => {
    const subtotal = cartItems.reduce((sum, item) => {
        if (item.type === "guide") {
            return sum + Number(item.extraPrice || 0);
        }
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);
    const total = subtotal + shippingCost;
    const totalSavings = cartItems.reduce(
        (sum, item) => sum + (item.originalPrice - item.price || 0),
        0
    );

    return (
        <div className="bg-gray-100 rounded-md border border-gray-200 p-6 text-sm font-sans space-y-4">
            <div className="space-y-5 max-h-[300px] overflow-y-auto px-6 py-6">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                        <div className="flex space-x-3">
                            <div className="relative">
                                <img
                                    src={item?.image}
                                    alt={item?.sectionTitle}
                                    className="h-14 w-14 rounded-md object-cover bg-white"
                                />
                                <span className="absolute -top-2 -left-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {item?.quantity}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-[#162950]">
                                    {item?.sectionTitle}
                                </p>
                                {item?.id !== "guideStandalone" && (
                                    <p className="text-xs text-gray-500">
                                        {item?.title} (−$
                                        {(item?.originalPrice - item?.price).toFixed(2)})
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="line-through text-gray-400 text-xs">
                                {(Number(item?.originalPrice) || 0).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                            <p className="font-medium text-sm">
                                {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Discount Code Input */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-sm"
                />
                <button className="px-4 py-2 bg-gray-200 rounded-md font-medium text-sm">
                    Apply
                </button>
            </div>

            {/* Price Summary */}
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-700">
                        Subtotal · {cartItems.reduce((s, i) => s + i.quantity, 0)} items
                    </span>
                    <span>
                        {(Number(subtotal) || 0).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700">Shipping</span>
                    <span>
                        {(Number(shippingCost) || 0).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2">
                    <span>Total</span>
                    <span>
                        {(Number(total) || 0).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
            </div>

            {/* Savings */}
            <div className="flex items-center space-x-2 text-green-600 font-semibold text-sm pt-1">
                <FaTag className="w-4 h-4" />
                <span>
                    TOTAL SAVINGS &nbsp;
                    {(Number(totalSavings) || 0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </div>
        </div>
    );
};

export default OrderSummary;
