import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../features/cart/cartSlice.js";

const steps = ["Cart", "Shipping", "Payment", "Place Order"];

const CheckoutSteps = ({ active }) => (
  <div className="flex justify-center gap-2 mb-8 text-sm">
    {steps.map((s, i) => (
      <span key={s} className={`px-3 py-1 rounded-full ${i <= active ? "bg-brand-600 text-white" : "bg-gray-200 text-gray-500"}`}>
        {s}
      </span>
    ))}
  </div>
);

const ShippingPage = () => {
  const { shippingAddress } = useSelector((s) => s.cart);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "India");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <CheckoutSteps active={1} />
      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="text-sm font-medium">Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Postal Code</label>
          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Country</label>
          <input value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium">Continue</button>
      </form>
    </div>
  );
};

export default ShippingPage;
export { CheckoutSteps };
