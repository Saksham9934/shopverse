import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import { setCredentials } from "../features/auth/authSlice.js";

const ProfilePage = () => {
  const { userInfo } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/mine");
        setOrders(data);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const { data } = await api.put("/auth/profile", {
        name,
        email,
        ...(password ? { password } : {}),
      });
      dispatch(setCredentials(data));
      toast.success("Profile updated");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
        <h1 className="text-xl font-bold mb-4">My Profile</h1>
        <form onSubmit={submitHandler} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <button disabled={saving} className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium">
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Paid</th>
                  <th className="p-3">Delivered</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-t">
                    <td className="p-3 font-mono text-xs">{o._id.slice(-8)}</td>
                    <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">₹{o.totalPrice}</td>
                    <td className="p-3">{o.isPaid ? "✅" : "❌"}</td>
                    <td className="p-3">{o.isDelivered ? "✅" : "❌"}</td>
                    <td className="p-3">
                      <Link to={`/order/${o._id}`} className="text-brand-600 underline">Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
