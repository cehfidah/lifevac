import React, { useState } from "react";
import SEO from "../../utils/SEO";
import { toast } from "react-toastify";
import Loading from "../../components/Common/Loading";
import { ApiHandler } from "../../helper/ApiHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaCheckCircle,
  FaClipboardList,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";
import trackingBg from "../../assest/image/traditional_bg_truck_desktop.jpg";

const TrackOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("order");
  const [formData, setFormData] = useState({
    orderId: "",
    emailOrPhone: "",
    trackingNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchOrderHistory = async (orderId) => {
    try {
      const historyResponse = await ApiHandler(
        "/get_order_history.php",
        "POST",
        { order_id: orderId },
        undefined,
        dispatch,
        navigate
      );
      if (historyResponse.data.status === "1" && historyResponse.data.data.length > 0) {
        setOrderHistory(historyResponse.data.data);
      } else {
        // If no history, default to a basic "Order Placed" status from the main order details
        setOrderHistory([{ status: "Order Placed", created_at: orderDetails?.created_date || new Date().toISOString() }]);
      }
    } catch (error) {
      toast.error("Could not fetch order history.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrderDetails(null);
    setOrderHistory([]);

    let endpoint = "";
    let payload = {};

    if (activeTab === "order") {
      if (!formData.orderId || !formData.emailOrPhone) {
        toast.error("Please fill in all fields.");
        setLoading(false);
        return;
      }
      endpoint = "/get_order_status.php";
      payload = {
        order_id: formData.orderId,
        email_or_phone: formData.emailOrPhone,
      };
    } else {
      if (!formData.trackingNumber) {
        toast.error("Please enter a tracking number.");
        setLoading(false);
        return;
      }
      endpoint = "/get_order_status_by_tracking.php";
      payload = { tracking_number: formData.trackingNumber };
    }

    try {
      const response = await ApiHandler(
        endpoint, "POST", payload, undefined, dispatch, navigate
      );
      if (response.data.status === "1" && response.data.data) {
        setOrderDetails(response.data.data);
        toast.success("Order found!");
        fetchOrderHistory(response.data.data.id);
      } else {
        toast.error(response.data.msg || "Could not find your order.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Track Your LifeVac Order"
        description="Check the status of your LifeVac order. Enter your order ID or tracking number to get the latest updates on your shipment."
      />
      <div
        className="min-h-screen bg-cover bg-center py-12 px-4 flex flex-col items-center"
        style={{ backgroundImage: `url(${trackingBg})` }}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6">
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("order")}
              className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                activeTab === "order"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Order Number
            </button>
            <button
              onClick={() => setActiveTab("tracking")}
              className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                activeTab === "tracking"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Tracking Number
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "order" ? (
              <>
                <input type="text" name="orderId" placeholder="Order Number" value={formData.orderId || ""} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="emailOrPhone" placeholder="Email or Phone Number" value={formData.emailOrPhone || ""} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500" />
              </>
            ) : (
              <input type="text" name="trackingNumber" placeholder="Tracking Number" value={formData.trackingNumber || ""} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500" />
            )}
            <button type="submit" className="w-full bg-[#0d2240] text-white py-3 rounded-md font-bold hover:bg-[#0b1c33] transition-transform transform active:scale-95" disabled={loading}>
              {loading ? "Tracking..." : "Track Your Order"}
            </button>
          </form>
        </div>

        {loading && !orderDetails && <Loading />}
        
        {orderDetails && <OrderDetailsDisplay order={orderDetails} history={orderHistory} />}
      </div>
    </>
  );
};

const OrderDetailsDisplay = ({ order, history }) => {
  const {
    shipping_address: shipping,
    product_detail: products,
    shipping_carrier,
    tracking_number,
  } = order;

  const getStatusIcon = (status) => {
    const icons = {
      "Order Placed": <FaClipboardList />,
      Processing: <FaBox />,
      Shipped: <FaShippingFast />,
      Delivered: <FaCheckCircle />,
    };
    return icons[status] || <FaBox />;
  };

  const timelineSteps = ["Order Placed", "Processing", "Shipped", "Delivered"];
  const latestStatus = history.length > 0 ? history[history.length - 1].status : "Order Placed";
  const latestStatusIndex = timelineSteps.indexOf(latestStatus);

  const getTrackingLink = (carrier, number) => {
    if (!carrier || !number) return null;
    const carrierLower = carrier.toLowerCase();
    if (carrierLower.includes("fedex")) return `https://www.fedex.com/fedextrack/?trknbr=${number}`;
    if (carrierLower.includes("ups")) return `https://www.ups.com/track?loc=en_US&tracknum=${number}`;
    if (carrierLower.includes("usps")) return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${number}`;
    if (carrierLower.includes("dhl")) return `https://www.dhl.com/en/express/tracking.html?AWB=${number}`;
    return null;
  };

  const trackingLink = getTrackingLink(shipping_carrier, tracking_number);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl mt-8 p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
        Order Details #{order.gateway_transaction_id}
      </h2>

      {tracking_number && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-2 flex items-center"><FaTruck className="mr-2 text-blue-600" /> Shipping Details</h3>
          <p className="text-sm"><strong>Carrier:</strong> {shipping_carrier || "N/A"}</p>
          <p className="text-sm"><strong>Tracking #:</strong> {tracking_number}</p>
          {trackingLink && (
            <a href={trackingLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Track on Carrier Website
            </a>
          )}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-6">Tracking Timeline</h3>
        <div className="flex items-center">
          {timelineSteps.map((step, index) => {
            const isCompleted = index <= latestStatusIndex;
            const historyItem = history.find((h) => h.status === step);
            const isNextStepCompleted = index + 1 <= latestStatusIndex;

            // **❗ LOGIC FIX**: Prioritize the specific shipped_date from the order object.
            let displayDate = null;
            if (step === 'Shipped' && order.shipped_date) {
                displayDate = order.shipped_date;
            } else if (historyItem) {
                displayDate = historyItem.created_at;
            }

            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isCompleted ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {getStatusIcon(step)}
                  </div>
                  <p className={`text-xs mt-2 font-semibold ${isCompleted ? "text-blue-600" : "text-gray-500"}`}>{step}</p>
                  {displayDate && (<p className="text-xs text-gray-400 mt-1">{new Date(displayDate).toLocaleDateString()}</p>)}
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className={`flex-1 h-1 self-start mt-6 mx-2 ${isNextStepCompleted ? "bg-blue-600" : "bg-gray-200"}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p className="text-sm"><strong>Order ID:</strong> {order.gateway_transaction_id}</p>
          <p className="text-sm"><strong>Date:</strong> {new Date(order.created_date).toLocaleDateString()}</p>
          <p className="text-sm font-bold mt-2"><strong>Total:</strong> ${order.final_amount}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className="text-sm">{shipping.firstName} {shipping.lastName}</p>
          <p className="text-sm">{shipping.address}, {shipping.apt || ''}</p>
          <p className="text-sm">{shipping.city}, {shipping.state} {shipping.zip}</p>
          <p className="text-sm">{shipping.country}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
        <div className="space-y-4">
          {products.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded-md">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-md bg-white border" />
              <div className="flex-1">
                <p className="font-semibold">{item.sectionTitle}</p>
                <p className="text-xs text-gray-600">{item.title} - {item.kits}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.price}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;