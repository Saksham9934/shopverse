import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import Rating from "../components/Rating.jsx";
import { addToCart } from "../features/cart/cartSlice.js";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart");
    navigate("/cart");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      toast.success("Review submitted");
      setRating(0);
      setComment("");
      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="text-brand-600 hover:underline text-sm">&larr; Back to products</Link>

      <div className="grid md:grid-cols-2 gap-10 mt-4">
        <img src={product.image?.url} alt={product.name} className="rounded-lg w-full object-cover max-h-[480px]" />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <p className="text-3xl font-bold text-brand-700 my-4">₹{product.price.toLocaleString("en-IN")}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="mb-1"><span className="font-medium">Brand:</span> {product.brand}</p>
          <p className="mb-4"><span className="font-medium">Status:</span>{" "}
            {product.countInStock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          {product.countInStock > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm">Qty:</label>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white px-6 py-2.5 rounded-md font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {product.reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
        <div className="space-y-4 mb-8">
          {product.reviews.map((r) => (
            <div key={r._id} className="border-b pb-3">
              <div className="flex items-center gap-2">
                <strong>{r.name}</strong>
                <Rating value={r.rating} />
              </div>
              <p className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</p>
              <p className="mt-1">{r.comment}</p>
            </div>
          ))}
        </div>

        {userInfo ? (
          <form onSubmit={submitReview} className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium">Write a review</h3>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Select rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Share your thoughts..."
              className="border rounded px-3 py-2 w-full"
              rows={3}
            />
            <button disabled={submitting} className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-md">
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600">
            Please <Link to="/login" className="text-brand-600 underline">sign in</Link> to write a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
