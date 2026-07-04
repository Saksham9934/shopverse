import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Furniture", "Beauty", "Sports", "Other"];

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({ url: "", public_id: "" });
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage({ url: data.url, public_id: data.public_id });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/products/${id}`, {
        name, price, image, brand, category, countInStock, description,
      });
      toast.success("Product updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/admin/products" className="text-brand-600 hover:underline text-sm">&larr; Back</Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Edit Product</h1>
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Price (₹)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Image</label>
          {image?.url && <img src={image.url} alt="preview" className="w-24 h-24 object-cover rounded my-2" />}
          <input type="file" accept="image/*" onChange={uploadFileHandler} className="w-full border rounded px-3 py-2 mt-1" />
          {uploading && <p className="text-xs text-gray-500 mt-1">Uploading to Cloudinary...</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Brand</label>
          <input value={brand} onChange={(e) => setBrand(e.target.value)} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded px-3 py-2 mt-1">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Count In Stock</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <button disabled={saving || uploading} className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium">
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;
