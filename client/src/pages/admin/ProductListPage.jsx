import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products?pageNumber=1");
      setProducts(data.products);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createHandler = async () => {
    try {
      const { data } = await api.post("/products", {});
      window.location.href = `/admin/product/${data._id}/edit`;
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={createHandler} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FaPlus /> Create Product
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.countInStock}</td>
                  <td className="p-3 flex gap-3">
                    <Link to={`/admin/product/${p._id}/edit`} className="text-brand-600"><FaEdit /></Link>
                    <button onClick={() => deleteHandler(p._id)} className="text-red-500"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
