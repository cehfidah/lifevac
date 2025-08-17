import { useState } from "react";
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
  FaRegFileAlt,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";

// This is the background image from your example.
// Please place the image file `{ED902DF2-35F4-4AEC-8593-E2E1A3FDFCD9}.jpg`
// inside your `src/assest/image/` folder and rename it to `tracking-bg.jpg`.
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrderDetails(null);

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
      // NOTE: This assumes you will create a new backend endpoint
      // called 'get_order_status_by_tracking.php'
      if (!formData.trackingNumber) {
        toast.error("Please enter a tracking number.");
        setLoading(false);
        return;
      }
      endpoint = "/get_order_status_by_tracking.php"; // You need to create this endpoint
      payload = { tracking_number: formData.trackingNumber };
    }

    try {
      const response = await ApiHandler(
        endpoint,
        "POST",
        payload,
        undefined,
        dispatch,
        navigate
      );
      if (response.data.status === "1" && response.data.data) {
        setOrderDetails(response.data.data);
        toast.success("Order found!");
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
                <input
                  type="text"
                  name="orderId"
                  placeholder="Order Number"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Email or Phone Number"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <input
                type="text"
                name="trackingNumber"
                placeholder="Tracking Number"
                value={formData.trackingNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              type="submit"
              className="w-full bg-[#0d2240] text-white py-3 rounded-md font-bold hover:bg-[#0b1c33] transition-transform transform active:scale-95"
              disabled={loading}
            >
              {loading ? "Tracking..." : "Track Your Order"}
            </button>
          </form>
        </div>

        {loading && <Loading />}

        {orderDetails && <OrderDetailsDisplay order={orderDetails} />}
      </div>
    </>
  );
};

// A new component to display order details beautifully
const OrderDetailsDisplay = ({ order }) => {
  const {
    shipping_address: shipping,
    product_detail: products,
    shipping_status,
  } = order;

  const getStatusIcon = (status) => {
    const statuses = {
      "Order Placed": <FaRegFileAlt className="text-blue-500" />,
      Shipped: <FaShippingFast className="text-blue-500" />,
      "Out for Delivery": <FaTruck className="text-blue-500" />,
      Delivered: <FaCheckCircle className="text-green-500" />,
    };
    return statuses[status] || <FaBox className="text-gray-500" />;
  };

  // Mock timeline based on a single status for demonstration.
  // This should be driven by more detailed status data from your backend.
  const timelineSteps = [
    "Order Placed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];
  const currentStatusIndex = timelineSteps.indexOf(shipping_status);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl mt-8 p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
        Order Details
      </h2>

      {/* Status Timeline */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tracking Status</h3>
        <div className="flex items-center justify-between">
          {timelineSteps.map((step, index) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  index <= currentStatusIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {getStatusIcon(step)}
              </div>
              <p
                className={`text-xs mt-2 font-semibold ${
                  index <= currentStatusIndex
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Info & Shipping */}
      <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p className="text-sm">
            <strong>Order ID:</strong> {order.gateway_transaction_id}
          </p>
          <p className="text-sm">
            <strong>Date:</strong>{" "}
            {new Date(order.created_date).toLocaleDateString()}
          </p>
          <p className="text-sm font-bold mt-2">
            <strong>Total:</strong> ${order.final_amount}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className="text-sm">
            {shipping.firstName} {shipping.lastName}
          </p>
          <p className="text-sm">
            {shipping.address}, {shipping.apt}
          </p>
          <p className="text-sm">
            {shipping.city}, {shipping.state} {shipping.zip}
          </p>
          <p className="text-sm">{shipping.country}</p>
        </div>
      </div>

      {/* Items List */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
        <div className="space-y-4">
          {products.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 bg-gray-50 rounded-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded-md bg-white border"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.sectionTitle}</p>
                <p className="text-xs text-gray-600">
                  {item.title} - {item.kits}
                </p>
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