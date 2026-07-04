import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deliverHandler = async (id) => {
    try {
      await api.put(`/orders/${id}/deliver`);
      toast.success("Marked as delivered");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">User</th>
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
                <td className="p-3">{o.user?.name || "Deleted user"}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-3">₹{o.totalPrice}</td>
                <td className="p-3">{o.isPaid ? "✅" : "❌"}</td>
                <td className="p-3">{o.isDelivered ? "✅" : "❌"}</td>
                <td className="p-3">
                  {!o.isDelivered && (
                    <button onClick={() => deliverHandler(o._id)} className="text-brand-600 underline">
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;
