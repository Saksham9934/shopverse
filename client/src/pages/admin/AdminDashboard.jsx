import { Link } from "react-router-dom";
import { FaBox, FaShoppingBag, FaUsers } from "react-icons/fa";

const AdminDashboard = () => (
  <div className="max-w-5xl mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
    <div className="grid sm:grid-cols-3 gap-6">
      <Link to="/admin/products" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md flex items-center gap-4">
        <FaBox size={28} className="text-brand-600" />
        <div><h2 className="font-semibold">Products</h2><p className="text-sm text-gray-500">Manage catalog</p></div>
      </Link>
      <Link to="/admin/orders" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md flex items-center gap-4">
        <FaShoppingBag size={28} className="text-brand-600" />
        <div><h2 className="font-semibold">Orders</h2><p className="text-sm text-gray-500">Track & fulfill</p></div>
      </Link>
      <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md flex items-center gap-4">
        <FaUsers size={28} className="text-brand-600" />
        <div><h2 className="font-semibold">Users</h2><p className="text-sm text-gray-500">Manage accounts</p></div>
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
