import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import { clearCartItems } from "../features/cart/cartSlice.js";
import { CheckoutSteps } from "./ShippingPage.jsx";

const PlaceOrderPage = () => {
  const cart = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    setLoading(true);
    try {
      const { data: order } = await api.post("/orders", {
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          image: item.image?.url,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      });

      dispatch(clearCartItems());
      navigate(`/order/${order._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <CheckoutSteps active={3} />
      <h1 className="text-2xl font-bold mb-6">Review Your Order</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Shipping</h2>
            <p className="text-sm text-gray-600">
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Payment Method</h2>
            <p className="text-sm text-gray-600">{cart.paymentMethod}</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-3">Order Items</h2>
            {cart.cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3 py-2 border-b last:border-0">
                <img src={item.image?.url} className="w-12 h-12 object-cover rounded" alt={item.name} />
                <Link to={`/product/${item._id}`} className="flex-1 hover:text-brand-600">{item.name}</Link>
                <span>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-2 text-sm">
          <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
          <div className="flex justify-between"><span>Items</span><span>₹{cart.itemsPrice}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{cart.shippingPrice}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>₹{cart.taxPrice}</span></div>
          <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>₹{cart.totalPrice}</span></div>
          <button
            disabled={cart.cartItems.length === 0 || loading}
            onClick={placeOrderHandler}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white py-2.5 rounded-md font-medium mt-3"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
