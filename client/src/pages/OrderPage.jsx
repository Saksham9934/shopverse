import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((s) => s.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const payWithRazorpay = async () => {
    setPaying(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Razorpay SDK failed to load. Check your connection.");
        return;
      }

      const { data: rzpOrder } = await api.post("/payments/razorpay/order", {
        amount: order.totalPrice,
      });

      const options = {
        key: rzpOrder.key,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "ShopVerse",
        description: `Order #${order._id}`,
        order_id: rzpOrder.id,
        handler: async (response) => {
          try {
            await api.post("/payments/razorpay/verify", {
              orderId: order._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment successful!");
            fetchOrder();
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: userInfo?.name,
          email: userInfo?.email,
        },
        theme: { color: "#0f9d6e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not initiate payment");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <Loader />;
  if (!order) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Order #{order._id}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Shipping</h2>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <p className={`mt-2 text-sm font-medium ${order.isDelivered ? "text-green-600" : "text-yellow-600"}`}>
              {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : "Not yet delivered"}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Payment</h2>
            <p className="text-sm text-gray-600">Method: {order.paymentMethod}</p>
            <p className={`mt-1 text-sm font-medium ${order.isPaid ? "text-green-600" : "text-red-600"}`}>
              {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : "Not paid"}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-3">Order Items</h2>
            {order.orderItems.map((item) => (
              <div key={item.product} className="flex items-center gap-3 py-2 border-b last:border-0">
                <img src={item.image} className="w-12 h-12 object-cover rounded" alt={item.name} />
                <Link to={`/product/${item.product}`} className="flex-1 hover:text-brand-600">{item.name}</Link>
                <span>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-2 text-sm">
          <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
          <div className="flex justify-between"><span>Items</span><span>₹{order.itemsPrice}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>₹{order.taxPrice}</span></div>
          <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>₹{order.totalPrice}</span></div>

          {!order.isPaid && order.paymentMethod === "Razorpay" && (
            <button
              onClick={payWithRazorpay}
              disabled={paying}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium mt-3"
            >
              {paying ? "Processing..." : "Pay Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
