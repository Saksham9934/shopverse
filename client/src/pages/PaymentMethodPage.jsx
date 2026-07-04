import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../features/cart/cartSlice.js";
import { CheckoutSteps } from "./ShippingPage.jsx";

const PaymentMethodPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((s) => s.cart);

  if (!shippingAddress.address) navigate("/shipping");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <CheckoutSteps active={2} />
      <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-sm space-y-3">
        <label className="flex items-center gap-2 border rounded p-3 cursor-pointer">
          <input type="radio" name="paymentMethod" value="Razorpay" checked={paymentMethod === "Razorpay"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Razorpay (Cards / UPI / Netbanking / Wallets)
        </label>
        <label className="flex items-center gap-2 border rounded p-3 cursor-pointer">
          <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Cash on Delivery
        </label>
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium mt-4">Continue</button>
      </form>
    </div>
  );
};

export default PaymentMethodPage;
