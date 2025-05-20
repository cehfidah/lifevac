import { useLocation, useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const location = useLocation();

  const transaction = location.state?.transaction || "";

  if (!transaction)
    return <div className="p-4 text-red-500">Transaction not found</div>;

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
        <h2 className="text-xl font-semibold text-blue-700">
          Transaction #{transaction.gateway_transaction_id}
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-[#162950]">
          <p>
            Status:
            <span
              className={`ml-2 px-2 py-1 rounded-full text-white ${
                transaction.payment_status === "COMPLETED"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            >
              {transaction.payment_status}
            </span>
          </p>
          <p>Date: {new Date(transaction.created_date).toLocaleString()}</p>
          <p>Quantity: {transaction.item_quantity}</p>
          <p>Subtotal: ${transaction.sub_total}</p>
          <p>Shipping: ${transaction.shipping_amount}</p>
          <p>Total Savings: ${transaction.total_saving}</p>
          <p className="font-semibold text-lg text-black">
            Final Amount: ${transaction.final_amount}
          </p>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#162950]">
          Shipping Address
        </h3>
        <div className="text-sm text-[#162950] space-y-1">
          <p>
            {transaction.shipping_address.firstName}{" "}
            {transaction.shipping_address.lastName}
          </p>
          <p>
            {transaction.shipping_address.address},{" "}
            {transaction.shipping_address.apt}
          </p>
          <p>
            {transaction.shipping_address.city},{" "}
            {transaction.shipping_address.state} -{" "}
            {transaction.shipping_address.zip}
          </p>
          <p>{transaction.shipping_address.country}</p>
          <p>
            Phone: +{transaction.shipping_address.phoneCode}{" "}
            {transaction.shipping_address.phone}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        <h3 className="text-lg font-semibold text-[#162950]">
          Product Details
        </h3>
        {transaction.product_detail.map((item, idx) => (
          <div key={idx} className="flex gap-4 border-b pb-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain rounded-md border"
            />
            <div className="flex flex-col text-sm text-[#162950] space-y-1">
              <h4 className="font-semibold text-[#162950]">
                {item.sectionTitle}
              </h4>
              <p>
                {item.title} - {item.kits}
              </p>
              <p>Price: ${item.price}</p>
              <p>Original Price: ${item.originalPrice}</p>
              {item.savings && <p>Savings: ${item.savings}</p>}
              {item.tag && (
                <span className="inline-block px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-md font-medium w-fit">
                  {item.tagText}
                </span>
              )}
              {item.guideIncluded && (
                <p className="text-green-600 font-medium">Guide Included</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
