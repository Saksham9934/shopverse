import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../features/cart/cartSlice.js";

const CartPage = () => {
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateQty = (item, qty) => dispatch(addToCart({ ...item, qty }));
  const removeItem = (id) => dispatch(removeFromCart(id));

  const checkoutHandler = () => navigate("/login?redirect=/shipping");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/" className="text-brand-600 underline">Go shopping</Link>
        </p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <img src={item.image?.url} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <Link to={`/product/${item._id}`} className="flex-1 font-medium hover:text-brand-600">
                  {item.name}
                </Link>
                <p className="w-24 font-semibold">₹{item.price.toLocaleString("en-IN")}</p>
                <select
                  value={item.qty}
                  onChange={(e) => updateQty(item, Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
                <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4">
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
            </h2>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between"><span>Items</span><span>₹{itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹{shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span>₹{taxPrice}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2">
                <span>Total</span><span>₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
